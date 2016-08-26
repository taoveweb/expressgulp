// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  md5 = require('md5');

var UserSchema = new Schema({
  name: {type:String,required:true},
  sex:{type:Number,default :0},
  admin: {type:Number,default:0},
  email: {type:String,required:true},
  phone:{type:String,default:0},
  password: {type:String,required:true},
  headPicture:{type:String,default :0},
  fans:[Schema.Types.Mixed],//粉丝
  concern:[Schema.Types.Mixed],//关注
  level:{type:Number,default :0},
  created: {type:Date}
});
UserSchema.methods.verifyPassword = function(password){
  var isMatch = md5(password) === this.password;
  return isMatch
}
mongoose.model('User', UserSchema);

/*
for(var i=0;i<10000000;i++){
  db.users.insert(
    {
      name:"admin"+Math.random().toString(10).substr(0,5),
      email:"admin@nodeblog.io",
      password:'96e79218965eb72c92a549dd5a330112',
      sex:Math.ceil(Math.random()*3),
      admin:Math.ceil(Math.random()*3),
      phone:Math.ceil(Math.random()*100000000000),
      created:new Date()
    }
  )

}

*/
