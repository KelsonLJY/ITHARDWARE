const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema=new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    order_date:{
        type: Date,
        required: true,
        default: Date.now,
    },
    delivery_date:{
        type: Date,
        required: true,
        default: (+new Date() + 12*24*60*60*1000)
        //Add 12 day
    },
    delivery_fee :{
        type : Number,
        required : true,
        default:0
    },
    delivery_address :{
        type : String,
        required : true,
        default:2
    },
    total :{
        type : Number,
        required : true,
        default:0
    },
    status : {  
        type : String,
        required : true,
        default : 'Pending'
        
        /** Pending, Delivered*/
    },
    details: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderItem"
        }
    ]
});

module.exports=new mongoose.model("Order", OrderSchema);