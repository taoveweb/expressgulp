/**
 * Created by Administrator on 2016/8/4 0004.
 */
var blocks = {};
module.exports={
  extend: function (name, context) {
    var block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
  },
  block: function (name) {
    var val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
  }
}
