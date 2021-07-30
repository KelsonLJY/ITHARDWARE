const router = require('express').Router()
const isAuth = require('../middleware/auth').isAuth;

const Item=require('../model/Item')
var url = require('url');

router.get('/api/update-qty', (req, res) => {
    Item.updateMany({},{"$set":{"available_qty": 20}}).exec();
    res.send('success')
})

router.get('/sent-reset-password' ,(req, res) => {
    
    res.render('success_rp_email')
    
})
router.get('/reset-new-password' ,(req, res) => {
    
    res.render('new_password')
    
})
router.get('/api/create-item' ,(req, res) => {
    
    res.send();
    
})
router.get('/' ,(req, res) => {
    res.render('Home')
})
router.get('/about' ,(req, res) => {
    res.render('About')
})
router.get('/items' ,(req, res) => {
    res.render('Items')
})
router.get('/delivery-info' , isAuth,async (req, res) => {
    res.render('Checkout')
})
router.get('/place-order' , isAuth ,(req, res) => {
    if(isAuth){
        res.render('PlaceOrder')
    }else{
        res.render('login')
    }
})
router.get('/contact' ,(req, res) => {
    res.render('Contact')
})

router.get('/helpadvice' ,(req, res) => {
    res.render('helpadvice')
})

router.get('/returnpolicy' ,(req, res) => {
    res.render('returnpolicy')
})

router.get('/termscondition' ,(req, res) => {
    res.render('termscondition')
})


router.get('/view-cart' ,(req, res) => {
    res.render('ViewCart')
})
router.get('/view-account'  ,isAuth ,(req, res) => {
    res.render('ViewAcct')
})
router.get('/resetpass' ,(req, res) => {
    res.render('ResetPass')
})

router.get('/login' ,(req, res) => {
    res.render('login')
})
router.get('/register' ,(req, res) => {
    res.render('register')
})
router.get('/edit-user', isAuth, (req, res, next) => {
    res.render('EditAcct')
})
router.get('/logout', (req, res, next) => {
    req.session.loggedin = false;
    req.logout();
    res.redirect('/login');
})

router.get('/orders', isAuth, (req, res, next) => {
    res.render('ordered_list')
})
router.get('/order-detail', isAuth, (req, res, next) => {
    res.render('orderdetail')
})
router.get('/api/get-items',  (req, res, next) => {
    Item.find({}, (err, items) => {
        res.send({
            items : items
        })
    });
})
router.get('/checkout-failed', isAuth, (req, res, next) => {
    res.render('failedcheckout')
})
router.post('/api/validate-qty' ,async (req, res) => {
    // let flag = true;

    // let itemIds = [];

    // for(let i=0, count = items.length ; i > count ; i++){
    //     itemIds.push(mongoose.Types.ObjectId(items[i]._id));
    // }

    // Item.find({
    //     '_id': { $in: itemIds}
    // })
    const order = req.body;
    const items = JSON.parse(order.items);
    let flag = true;
    let count =   items.length;
    for(let i=0; i < count ; i++){
        const _item = items[i];

        let item = await Item.findOne({_id : _item._id}).exec();
      
        if(item){
            
            // console.log(`QTY ${_item.qty}, Available Qty ${item.available_qty}`)
            if(+_item.qty > +item.available_qty){

                flag = false;
                break;
            }
        }
    }


    //     let item = await Item.findOne({_id : e._id}).exec();
    //     if(item){
    //         console.log(`QTY ${e.qty}, Available Qty ${item.available_qty}`)
    //         console.log(+e.qty > +item.available_qty)

    //         if(+e.qty > +item.available_qty){
    //             flag = false;
    //             return;
    //         }
    //     }
    // })
    if(!flag){
        res.status(422).send('Order unsuccessful!!')
    }  else{
        res.send('Order successful!!')
    } 

})



module.exports=router;