var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
 var bcrypt = require('bcrypt');
 var passportLocalMongoose = require('passport-local-mongoose');

    var saltRounds = 10; 

var UserSchema = new Schema({
    email:  {
      type: String,
      required: true
    }, 
    password: {
      type: String,
      required: true
    },
});


UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function(){
 this.password = bcrypt.hashSync(this.password, saltRounds);
// console.log('huh did it go through?' + this.password + ' after hash'); 
  
  });


  //UserSchema.plugin(passportLocalMongoose);
  UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });
  
var User = mongoose.model("User", UserSchema);


module.exports = User;

