const router=require('express').Router()
const User_model=require('../model/User')
const bcrypt = require('bcrypt')

router.post('/user/register',(req,res)=>{
    const user=req.body;
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(user.password, salt);
    
    const newTodo=new User_model({
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
    newTodo.save().then(()=>{
        console.log("done")
        res.redirect('/')
    })
    .catch(err=>console.log(err))
})

module.exports=router;