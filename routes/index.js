const router = require('express').Router()
const isAuth = require('../middleware/auth').isAuth;

router.get('/' ,(req, res) => {
    res.render('Home')
})
router.get('/about' ,(req, res) => {
    res.render('About')
})
router.get('/items' ,(req, res) => {
    res.render('Items')
})
router.get('/contact' ,(req, res) => {
    res.render('Contact')
})
router.get('/view-cart' ,(req, res) => {
    res.render('Checkout')
})
router.get('/view-account'  ,isAuth ,(req, res) => {
    if(isAuth){
        res.render('ViewAcct')
    }else{
        res.render('login')
    }

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