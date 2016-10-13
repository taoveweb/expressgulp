// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  md5 = require('md5');

var UserSchema = new Schema({
  nic: {type:String,default :''},
  name: {type:String,default :''},
  weixin: {type:String,default :''},
  sina: {type:String,default :''},
  qq: {type:String,default :''},
  sex:{type:Number,default :0},
  admin: {type:Number,default:0},
  email: {type:String,default :''},
  phone:{type:String,default:0},
  password: {type:String,required:true},
  disable: {type:Number,default:0},//0激活 1停用
  headPicture:{type:String,default :""},
  following:[{type: Schema.Types.ObjectId,default :[]}],//关注
  followers:[{type: Schema.Types.ObjectId,default :[]}],//被关注
  recommend:[{type: Schema.Types.ObjectId,default :[]}],//推荐用户
  latestVisited:[{type: Schema.Types.ObjectId,default :[]}],//最近访问的用户
  level:{type:Number,default :0},
  loginIp:{type:String,default :''},
  created: {type: Date,default :new Date()},
  updateby: {type: Date,default :new Date()},
  albums:[Schema.Types.Mixed],//所有相册列表
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


