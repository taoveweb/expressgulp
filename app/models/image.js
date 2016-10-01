// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ImageSchema = new Schema({
  album:{type: String, default: "选择相册"},//属于哪一个相册，可以同时属于多个相册
  introduction: {type: String, required: true},
  imgUrl: {type: String, default :""},
  device: {type: String, default :""},
  width:{type:Number,default :0},
  height:{type:Number,default :0},
  author: {type: Schema.Types.ObjectId, ref: "User"},
  published: {type: Number, default: 1},
  sign:[Schema.Types.Mixed],//关健字
  meta: {type: Schema.Types.Mixed,default :[]},//被赞
  excellent:{type:Number,default :0},//是否精选
  comments: [Schema.Types.Mixed],//评论
  created: {type: Date,default :new Date()},
  phototime: {type: Date,default :new Date()},
  updateby: {type: Date,default :new Date()}
});

mongoose.model('Image', ImageSchema);

/*
for (var i = 0; i < 1000; i++) {
  db.images.insert(
    {
      introduction: "first post in javascript",
      imgUrl: "",
      author: ObjectId("57bcfbf3263b938c183769c5"),
      published: true,
      sign:["中国"],
      excellent:Math.floor(Math.random()*2),
      meta: {favourates:0 },
      comments: [
        {user:ObjectId("57a3b4f50d72012eec93cab1"),content:'这是一个内容'+Math.random().toString(16).substr(2,5)},
        {user:ObjectId("57a3b4f50d72012eec93cab1"),content:'这是一个内容'+Math.random().toString(16).substr(2,5)}
      ],
      created: new Date()
    }
  )

}
*/
