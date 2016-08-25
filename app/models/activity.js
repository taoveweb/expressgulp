// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  title: {type:String,required:true},
  imgurl: {type:String,required:true},
  content: {type:String,required:true},
  created: {type:Date}
});

mongoose.model('Activity', ActivitySchema);

//db.categorys.insert([
//  {
//    title:"javascript",
//    slug:"javascript",
//    created:new Date()
//  },
//  {
//    title:"css",
//    slug:"css",
//    created:new Date()
//  },
//  {
//    title:"html",
//    slug:"html",
//    created:new Date()
//  },
//  {
//    title:"Tools",
//    slug:"Tools",
//    created:new Date()
//  }
//])
