// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type:String,required:true},
  email: {type:String,required:true},
  password: {type:String,required:true},
  created: {type:Date}
});

mongoose.model('User', UserSchema);

//db.users.insert([
//  {
//    name:"admin",
//    email:"admin@nodeblog.io",
//    password:'000000',
//    created:new Date()
//  }
//])

