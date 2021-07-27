const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const orderItemSchema=new mongoose.Schema({
    item: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Item",
    },
    qty :{
        type : Number,
        required : true,
        default:0
    },
    price : {
        type : Number,
        required : true,
        default:0
    },
    amount :{
        type : Number,
        required : true,
        default:0
    }
});

module.exports=new mongoose.model("OrderItem",orderItemSchema); 