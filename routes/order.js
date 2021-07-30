const router=require('express').Router()
const Order=require('../model/Order')
const Item=require('../model/Item')
const OrderItem=require('../model/OrderItem')
const isAuth = require('../middleware/auth').isAuth;

const mongoose=require('mongoose');

router.post('/api/confirm-order', isAuth, async (req,res)=>{
    const order = req.body;

    const items = JSON.parse(order.items);

    const newOrder=await new Order({
        status : 'Pending',
        userId : req.user.id,
        delivery_address : order.address,
        delivery_fee : 2,
        total: order.total
    })
    const _newOrder = await newOrder.save();
    items.forEach(async  (e) => {
        let amount = +e.price * +e.qty;

        const newOrderItem = new OrderItem({
            orderId : newOrder._id,
            item : e._id,
            qty : e.qty,
            price : e.price,
            amount : amount
        })
        const orderItem = await newOrderItem.save();
        const _order = await Order.updateOne({_id : _newOrder._id}, {$push: { details: orderItem._id }});

        const _item = await Item.findOne({_id : e._id});
        console.log(_item)
        await Item.updateOne({_id : _item._id}, {$set: { available_qty: +_item.available_qty - +e.qty }});
    })
    res.send('Success')
        
    
}).get('/api/get-orders', isAuth,  async (req,res)=>{
    let orders = await Order.find({userId: req.user._id}).populate({
        path: 'details',
        model: 'OrderItem',
        populate: {
            path: 'item',
            model: 'Item'
        }
    });
    res.send(orders)
})
.get('/api/get-order-detail', isAuth, async (req,res)=>{

    if( !mongoose.Types.ObjectId.isValid( req.query.order_id) ) { return res.status(404).send('Invalid Order No.')}
   


    let order = await Order.findOne({userId: req.user._id, _id : req.query.order_id}).populate({
        path: 'details',
        model: 'OrderItem',
        populate: {
            path: 'item',
            model: 'Item'
        }
    });

    if(order){
        
        return res.send(order)
    }else{
        return res.status(404).send('Not Found')
    }
})



module.exports=router;