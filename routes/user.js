const router=require('express').Router()
const User=require('../model/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const isAuth = require('../middleware/auth').isAuth;

router.post('/api/register',async (req,res)=>{
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
        res.send({
            message : 'Successfully Saved.'
        })
    })
    .catch( error=>{
        console.log(error)
        return res.status(500).send({
            message : 'Error occurs while creating user.'
        })
    })
})
.get('/api/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.' +  req.user.full_name);
})
.get('/api/logout', (req, res, next) => {
    req.logout();
    res.send('Logged out');
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
        
        req.login(user, (err) => {
            res.send({
                email : user.email,
                full_name : user.full_name
            })
        })
    })(req, res, next)
})



module.exports=router;