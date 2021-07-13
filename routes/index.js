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


module.exports=router;