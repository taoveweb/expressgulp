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
