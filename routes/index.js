const router = require('express').Router()
const isAuth = require('../middleware/auth').isAuth;
const nodemailer = require('nodemailer');
const Item=require('../model/Item')
var url = require('url');


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
router.get('/delivery-info' ,(req, res) => {
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



module.exports=router;