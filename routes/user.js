const router=require('express').Router()
const User=require('../model/User')
const Token=require('../model/Token')

const bcrypt = require('bcrypt')
const passport = require('passport')
const isAuth = require('../middleware/auth').isAuth;
const nodemailer = require('nodemailer');
const crypto = require("crypto");


var transport = nodemailer.createTransport({
    host: "smtp.googlemail.com",
    port: 587,
    auth: {
        user: "amydev.me@gmail.com",
        pass: "Amy123!*"
    }
  });

router
.get('/api/user-editprofile', isAuth, (req, res, next) => {
    res.send(req.user)
})
.post('/api/register',async (req,res)=>{
    const user=req.body;
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(user.password, salt);
        
    const is_exists = await User.findOne({ email: user.email }).exec();
    if(is_exists){
        return res.status(422).send({
            message : 'Email already registered.'
        })
    }
  
    const newUser=new User({
        full_name:user.full_name,
        dob:user.dob,
        email:user.email,
        password:hash,
        phone: user.phone,
        address:user.address,
        postal_code : user.postal_code,
    })
    newUser.save().then(()=>{
        res.redirect('/')
    })
    .catch(err=>console.log(err))
})
.get('/api/user-profile', isAuth, (req, res, next) => {
    res.send(req.user);
})
.put('/api/user-editprofile', isAuth, async (req, res, next) => {
    const filter = { email: req.user.email};
    const user=req.body;
    await User.updateOne(filter, user);
    res.send('Successfully Updated');
})
.post("/api/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).send({
                message : 'Invalid email or password'
            })
        }
        req.session.loggedin = true;
        req.session.user = user;
        req.login(user, (err) => {
            res.send({
                email : user.email,
                full_name : user.full_name
            })
        })
    })(req, res, next)
})
.post("/api/sent-reset-link", async (req, res, next) => {
    const user=req.body;
    const tmpUser = await User.findOne({ email: user.email, dob : user.dob }).exec();
    if(!tmpUser){
        return res.status(422).send({
            message : 'Invalid Email or DOB.'
        })
    }
    // const filter = { email: user.email};
    const _token = crypto.randomBytes(20).toString('hex');
    
    const newToken=new Token({
        userId : tmpUser._id,
        token : _token
    })
    newToken.save().then(()=>{
    })
    .catch(err=>console.log(err))

    let requrl = `${req.protocol}://${req.get('host')}/reset-new-password?id=${tmpUser._id}&token=${_token}`;
    const msg = {
        to: 'ampyaephyonaing@gmail.com', // Change to your recipient
        from: 'amydev.me@gmail.com', // Change to your verified sender
        subject: 'Reset Password : IT HARDWARE',
        html: `Dear ${tmpUser.full_name}, <br><br> To reset the password to your account, click the link below:<br> ${requrl}`,
      }
    transport.sendMail(msg, function(err, info) {
        if (err) {  
            res.send({
                message : err
            })
        } else {
            res.send({
                message : "Success"
            })
        }
    });
})
.post('/api/update-new-password',  async (req, res, next) => {
    const user = req.body;
    let token = await Token.findOne({token: user.token, userId: user.id});
    if(!token){
        res.status(404).send({message : "Invalid link or expired."});
    }
    await token.delete();
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(user.password, salt);
    await User.updateOne({_id : user.id}, {
        password:hash
    });
    res.send(token);
})


module.exports=router;