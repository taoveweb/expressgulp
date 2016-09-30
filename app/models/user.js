// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  md5 = require('md5');

var UserSchema = new Schema({
  nic: {type:String,default :''},
  name: {type:String,default :''},
  sex:{type:Number,default :0},
  admin: {type:Number,default:0},
  email: {type:String,default :''},
  phone:{type:String,default:0},
  password: {type:String,required:true},
  disable: {type:Number,default:0},//0激活 1停用
  headPicture:{type:String,default :""},
  fans:[Schema.Types.Mixed],//粉丝
  concern:[Schema.Types.Mixed],//关注
  level:{type:Number,default :0},
  loginIp:{type:String,default :''},
  created: {type: Date,default :new Date()},
  updateby: {type: Date,default :new Date()}
});
UserSchema.methods.verifyPassword = function(password){
  var isMatch = md5(password) === this.password;
  return isMatch
}
mongoose.model('User', UserSchema);

/*
for(var i=0;i<1000;i++){
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

/*db.users.insert(
  {
    name:"admin",
    email:"admin@oldku.com",
    password:'96e79218965eb72c92a549dd5a330112',
    sex:Math.ceil(Math.random()*3),
    admin:3,
    phone:18059178863,
    created:new Date()
  }
)*/


