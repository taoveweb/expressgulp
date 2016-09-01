// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  title: {type: String, required: true},
  imgUrl: {type: String, default :''},
  published: {type: Number, default: 0},
  sign:[Schema.Types.Mixed],//关健字
  author: {type: Schema.Types.ObjectId, ref: "User"},
  content: {type: String, required: true},
  created: {type: Date,default :new Date()},
  updateby: {type: Date,default :new Date()}
});

mongoose.model('Activity', ActivitySchema);

/*for (var i = 0; i < 1000; i++) {
  db.activitys.insert(
    {
      title: "我要驾车去旅行",
      imgurl: "",
      author: ObjectId("57c12c1c6b4fcbbaf0f7a8dc"),
      content: "我要驾车去旅行这是一个文本内容",
      created: new Date()
    });
}*/
