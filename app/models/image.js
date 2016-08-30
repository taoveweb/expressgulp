// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ImageSchema = new Schema({
  introduction: {type: String, required: true},
  imgUrl: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: "User"},
  published: {type: Number, default: 1},
  sign:[Schema.Types.Mixed],//关健字
  meta: {type: Schema.Types.Mixed},//被赞
  excellent:{type:Number,default :0},//是否精选
  comments: [Schema.Types.Mixed],
  created: {type: Date}
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
