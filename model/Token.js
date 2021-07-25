const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema=new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token:{
        type: String,
        required: true,
    },
    createdAt :{
        type: Date,
        default: Date.now,
        expires: 3600,
    }
});

module.exports=new mongoose.model("Token",TokenSchema);