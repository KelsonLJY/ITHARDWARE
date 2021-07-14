const router=require('express').Router()
const User_model=require('../model/User')
const bcrypt = require('bcrypt')
const passport = require('passport')

router.post('/user/register',(req,res)=>{
    const user=req.body;
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(user.password, salt);
    
    const newUser=new User_model({
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
        console.log("done")
        res.redirect('/')
    })
    .catch(err=>console.log(err))
}).post("/api/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        
        if (!user) {
            return res.status(400).send([user, "Cannot log in", info])
        }
  
        req.login(user, (err) => {
            res.send("Logged in")
        })
    })(req, res, next)
  })


module.exports=router;