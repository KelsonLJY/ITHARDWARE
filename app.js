const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport')
const cookieSession = require('cookie-session')
const UserModel = require('./model/User')
const bcrypt = require('bcrypt')
// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}))
/**
 * Connect To the database
 */
mongoose.connect("mongodb+srv://amydev:Amy123!*@cluster0.ogfnn.mongodb.net/it_hardware?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex : true
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(passport.initialize())
app.use(passport.session())


app.use(require("./routes/index"))
app.use(require("./routes/user"))

app.post("/api/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return next(err);
      }
      
      if (!user) {
          return res.status(400).send([user, "Cannot log in", info])
      }

      req.login(user, (err) => {
          res.send("Logged in")
      })
  })(req, res, next)
})


const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
  } else {
      return next()
  }
}
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, 
async (username, password, done) => {
 
  let _password = password;
  let user = await UserModel.findOne({email : username}).exec();
  let is_true= bcrypt.compareSync(_password, user.password);

    if(is_true){
      done(null, user)

    } else {
        done(null, false, {message: 'Incorrect username or password'})
    }
}
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async(id, done) => {
  let user = await UserModel.findById(id).exec();
  done(null, user)
})

app.listen(port, function () {
    console.log('Server started on port ' + port);
});