// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  title: {type: String, required: true},
  imgurl: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: "User"},
  content: {type: String, required: true},
  created: {type: Date}
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
