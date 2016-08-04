// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type:String,required:true},
  content: {type:String,required:true},
  slug: {type:String,required:true},
  category: {type:Schema.Types.ObjectId,required:true},
  author: {type:Schema.Types.ObjectId,required:true},
  published:{type:Boolean,default :false},
  meta:{type:Schema.Types.Mixed},
  comments:[Schema.Types.Mixed],
  created: {type:Date}
});

mongoose.model('Post', PostSchema);

//db.posts.insert([
//  {
//    title: "first post in javascript",
//    content: "first post in javascript",
//    slug: "first-post-in-javascript",
//    category: ObjectId("57a3b5600d72012eec93cab2"),
//    author: ObjectId("57a3b4f50d72012eec93cab1"),
//    published:true,
//    meta:{favourates:0},
//    comments:[],
//    created: new Date()
//  },
//  {
//    title: "first post in css",
//    content: "first post in css",
//    slug: "first-post-in-css",
//    category: ObjectId("57a3b5600d72012eec93cab3"),
//    author: ObjectId("57a3b4f50d72012eec93cab1"),
//    published:true,
//    meta:{favourates:0},
//    comments:[],
//    created: new Date()
//  },
//  {
//    title: "first post in html",
//    content: "first post in html",
//    slug: "first-post-in-html",
//    category: ObjectId("57a3b5600d72012eec93cab4"),
//    author: ObjectId("57a3b4f50d72012eec93cab1"),
//    published:true,
//    meta:{favourates:0},
//    comments:[],
//    created: new Date()
//  },
//  {
//    title: "first post in Tools",
//    content: "first post in Tools",
//    slug: "first-post-in-Tools",
//    category: ObjectId("57a3b5600d72012eec93cab5"),
//    author: ObjectId("57a3b4f50d72012eec93cab1"),
//    published:true,
//    meta:{favourates:0},
//    comments:[],
//    created: new Date()
//  }
//])
