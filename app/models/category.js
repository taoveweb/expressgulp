// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  title: {type:String,required:true},
  slug: {type:String,required:true},
  created: {type:Date}
});

mongoose.model('Category', CategorySchema);

//db.categorys.insert([
//  {
//    title:"javascript",
//    flug:"javascript",
//    created:new Date()
//  },
//  {
//    title:"css",
//    flug:"css",
//    created:new Date()
//  },
//  {
//    title:"html",
//    flug:"html",
//    created:new Date()
//  },
//  {
//    title:"Tools",
//    flug:"Tools",
//    created:new Date()
//  }
//])
