const router = require('express').Router()
const isAuth = require('../middleware/auth').isAuth;
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')
const msg = {
    to: 'ampyaephyonaing@gmail.com', // Change to your recipient
    from: 'CT0345078@kaplan.edu.sg', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
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
router.get('/view-cart' ,(req, res) => {
    res.render('ViewCart')
})
router.get('/view-account'  ,isAuth ,(req, res) => {
    res.render('ViewAcct')
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