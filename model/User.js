const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    full_name:{
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
    },
    postal_code:{
        type:String,
        required:true
    }
});

module.exports=new mongoose.model("User",UserSchema);