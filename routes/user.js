const router=require('express').Router()
const User=require('../model/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const isAuth = require('../middleware/auth').isAuth;

router
.get('/api/user-editprofile', isAuth, (req, res, next) => {
    res.send(req.user)
})
.post('/user/register',async (req,res)=>{
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
    // res.send('You made it to the route.' +  req.user.full_name);
})
.get('/api/user-editprofile', isAuth, (req, res, next) => {
    res.send(req.user);
    // res.send('You made it to the route.' +  req.user.full_name);
})



// .put('/api/user-editprofile', isAuth, (req, res, next) => {
//     res.send(req.user);
//     // res.send('You made it to the route.' +  req.user.full_name);
// })

.get('/api/logout', (req, res, next) => {
    req.logout();
    res.send('Logged out');
})

// .get("/logout", function (req, res) {
//     var token = req.query.token;
//     if (token == undefined) {
//         res.status(401).send("No tokens are provided");
//     } else {
//         db.checkToken(token, function (err, user) {
//             if (err || user == null) {
//                 res.status(401).send("Invalid token provided");
//             } else {
//                 db.removeToken(user._id, function (err, user) {
//                     res.status(200).send("Logout successfully")
//                 });
//             }
//         })
//     }
// })

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
        // res.locals.user = req.session.user;

        req.login(user, (err) => {
   
            res.send({
                email : user.email,
                full_name : user.full_name
            })
        })
    })(req, res, next)
})



module.exports=router;