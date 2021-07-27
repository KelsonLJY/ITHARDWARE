const mongoose=require('mongoose');
const ItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    descriptions:{
        type: String,
        required: true,
    },
    price : {
        type : Number,
        required : true
    },
    img_url : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    available_qty : {
        type : Number,
        default:0
    }
});

module.exports=new mongoose.model("Item",ItemSchema);