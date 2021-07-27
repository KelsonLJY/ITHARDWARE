const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
const app = express();
const port = process.env.PORT || 3000;


require("./config/database")

/**
 * Cookie
 */
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(passport.initialize())
app.use(passport.session())


app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


app.use(express.static('public'))
app.use(require("./routes/index"))
app.use(require("./routes/user"))
app.use(require("./routes/order"))
require("./config/passport")


app.listen(port, function () {
    console.log('Server started on port ' + port);
});