const router=require('express').Router()
const Order=require('../model/Order')
const OrderItem=require('../model/OrderItem')
const isAuth = require('../middleware/auth').isAuth;



router.post('/api/confirm-order', isAuth, async (req,res)=>{
    const order = req.body;

    const items = JSON.parse(order.items);

    const newOrder=await new Order({
        total : 0,
        status : 'Pending',
        userId : req.user.id,
        delivery_address : order.address,
        delivery_fee : 2
    })
    const _newOrder = await newOrder.save();
 
    items.forEach(async  (e) => {
        const newOrderItem = new OrderItem({
            orderId : newOrder._id,
            item : e._id,
            qty : e.qty,
            price : e.price,
            amount : +e.price * +e.qty
        })

        const orderItem = await newOrderItem.save();

        const _order = await Order.updateOne({_id : _newOrder._id}, {$push: { details: orderItem._id }});
        console.log(_order)
    })
  
    res.send('Success')
        
    
}).get('/api/get-orders', isAuth, async (req,res)=>{
    let orders = await Order.find({userId: req.user._id}).populate({
        path: 'details',
        model: 'OrderItem',
        populate: {
            path: 'item',
            model: 'Item'
        }
    });
    return res.send(orders)
})


module.exports=router;