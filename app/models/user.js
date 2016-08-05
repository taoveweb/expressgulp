// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  md5 = require('md5');

var UserSchema = new Schema({
  name: {type:String,required:true},
  email: {type:String,required:true},
  password: {type:String,required:true},
  created: {type:Date}
});
UserSchema.methods.verifyPassword = function(password){
  var isMatch = md5(password) === this.password;
  console.log('UserSchema.methods.verifyPassword',password,this.password,isMatch)
  return isMatch
}
mongoose.model('User', UserSchema);


//db.users.insert([
//  {
//    name:"admin",
//    email:"admin@nodeblog.io",
//    password:'000000',
//    created:new Date()
//  }
//])

