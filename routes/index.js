const router = require('express').Router()
const User=require('../model/User')
const isAuth = require('../middleware/auth').isAuth;
// router.get('/' ,(req, res) => {
//     res.render('index')
// })
router.get('/' ,(req, res) => {
    res.render('Home')
})
router.get('/Home.ejs' ,(req, res) => {
    res.render('Home')
})
router.get('/About.ejs' ,(req, res) => {
    res.render('About')
})
router.get('/Items.ejs' ,(req, res) => {
    res.render('Items')
})
router.get('/Contact.ejs' ,(req, res) => {
    res.render('Contact')
})
router.get('/ViewAcct.ejs' ,(req, res) => {
    res.render('ViewAcct')
})
router.get('/login' ,(req, res) => {
    res.render('login')
})

router.get('/register' ,(req, res) => {
    res.render('register')
})
router.post('/login', (req, res) => {
    req.session.loggedin = true
})




router.get('/edit-user', isAuth, (req, res, next) => {
    res.render('EditAcct')
})

var fs = require('fs');
router.get('/api/get-items', isAuth, (req, res, next) => {
    var items = [];
    var user = req.user;
   
    fs.readFile("./collection/items.json", function(err, data) {
        // Check for errors
        if (err) throw err;
        // Converting to JSON
        items = JSON.parse(data);
        res.send({
            items : items,
            user : user
        })
    });

    
})

//get and display user in viewacct
// router.get('/users', function (req, res) {
//     db.getAllUsers(function (err, users) {
//         res.send(users);
//     })
// })

module.exports=router;