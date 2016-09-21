/**
 * Created by kiiekin on 16/9/21.
 */

module.exports=function(req,res,next){
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    return true
  }else {
    return false;
  }
}
