// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  md5 = require('md5');

var AdminSchema = new Schema({
  name: {type:String,required:true},
  admin: {type:Boolean,default:false},
  password: {type:String,required:true},
  created: {type:Date}
});
AdminSchema.methods.verifyPassword = function(password){
  var isMatch = md5(password) === this.password;
  return isMatch
}
mongoose.model('Admin', AdminSchema);


//db.users.insert([
//  {
//    name:"admin",
//    email:"admin@nodeblog.io",
//    password:'000000',
//    created:new Date()
//  }
//])

