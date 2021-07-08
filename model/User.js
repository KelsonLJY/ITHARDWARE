const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    
    email_:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
    ,
    username:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: true,
    },
    dob:{
        type:String,
        required: true,
    }
});

module.exports=new mongoose.model("User",UserSchema);