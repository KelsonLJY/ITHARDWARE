const router=require('express').Router()
const User=require('../model/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const isAuth = require('../middleware/auth').isAuth;

router.post('/user/register',(req,res)=>{
    const user=req.body;
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(user.password, salt);
    
    const newUser=new User({
        email:user.email,
        password:hash,
        full_name:user.full_name,
        address:user.address,
        postal_code : user.postal_code,
        phone: user.phone,
        dob:user.dob,
        hp : user.hp,
        phone : user.mobile
    })
    newUser.save().then(()=>{
        res.redirect('/')
    })
    .catch(err=>console.log(err))
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