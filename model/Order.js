const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    item_id:{
        type:Number,
        required: true
    },
    order_date:{
        type: Date,
        required: true,
    },
    delivery_date :{
        type: Date,
        required : true
    }
});

module.exports=new mongoose.model("User",UserSchema);