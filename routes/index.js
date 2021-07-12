const router = require('express').Router()

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
router.get('/login' ,(req, res) => {
    res.render('login')
})

router.get('/register' ,(req, res) => {
    res.render('register')
})
// router.post('/users',  function (req, res) {
//     var data = req.body;
//     db.addCustomer(data.name, data.email, data.address, data.phone, data.password, data.reconfirmpassword,
//         function (err, customer) {
//             console.log(customer);
//             res.redirect('/welcome.html');
//         })
// });
// router.get('/users', function (req, res) {
//     db.getAllCustomers(function (err, customers) {
//         res.send(customers);
//     })
// })


module.exports=router;