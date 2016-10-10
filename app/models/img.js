// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var imgSchema = new Schema({
  imgUrl: {type: String, default :""},
  album: {type: String, default :""},
  device: {type: String, default :""},
  signature: {type: String, default :""},
  width: {type: Number, default :0},
  height: {type: Number, default :0},
  size: {type: Number, default :0},
  author: {type: Schema.Types.ObjectId, ref: "User"},
  created: {type: Date,default :new Date()},
  lastModifiedDate: {type: Date,default :new Date()},

});

mongoose.model('Img', imgSchema);

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
