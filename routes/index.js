const router = require('express').Router()
const isAuth = require('../middleware/auth').isAuth;
const nodemailer = require('nodemailer');

const msg = {
    to: 'ampyaephyonaing@gmail.com', // Change to your recipient
    from: ' amydev.me@gmail.com', // Change to your verified sender
    subject: 'Reset Password',
    text: 'Click here to reset password',
    html: 'Click here to reset password',
  }
var transport = nodemailer.createTransport({
    host: "smtp.googlemail.com",
    port: 587,
    auth: {
        user: "USERNAME",
        pass: "PASSWORD"
    }
  });
router.get('/api/test-email', (req, res) =>{
    transport.sendMail(msg, function(err, info) {
        if (err) {  
            res.send({
                message : err
            })
        } else {
            res.send({
                message : "Success"
            })
        }
    });
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
    res.render('resetpass')
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

var fs = require('fs');
router.get('/api/get-items',  (req, res, next) => {
    var items = [];
   
    fs.readFile("./collection/items.json", function(err, data) {
        // Check for errors
        if (err) throw err;
        // Converting to JSON
        items = JSON.parse(data);
        res.send({
            items : items,
        })
    });

    
})

module.exports=router;