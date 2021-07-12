const express = require('express');
const mongoose=require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const app = express();
const port = process.env.PORT || 3000;
dotenv.config({ path: './app.env' })
const User_model=require('./model/User')

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
app.use(express.static('public'))
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');

app.use(require("./routes/index"))
app.use(require("./routes/user"))

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  (username, password, done) => {
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(user.password, salt);
    
      let user = User_model.find((user) => {
          return user.email === username && bcrypt.compareSync(user.password, hash);
      })
      
      if (user) {
          done(null, user)
      } else {
          done(null, false, {message: 'Incorrect username or password'})
      }
  }
))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let user = User_model.find((user) => {
      return user.id === id
  })

  done(null, user)
})


app.listen(port, function () {
    console.log('Server started on port ' + port);
});