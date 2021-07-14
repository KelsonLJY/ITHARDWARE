const passport = require('passport')
const UserModel = require('./model/User')
const bcrypt = require('bcrypt')


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