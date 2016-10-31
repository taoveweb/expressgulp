/**
 * Created by kiiekin on 16/10/30.
 */
$(function(){
    $('.btn').click(function(){
        var res=$('#form').serializeArray();

        if(res.length<15){
            layer.msg('请把15道题做完!',function(){
//关闭后的操作
            })
        }else{
            var val=0;
            res.forEach(function(item,i){
                val=parseInt(item.value)+val;
            })
            $('.btn').html('重新提交试卷');
            $('.result').fadeIn();
            $('.rval').html(val)

        }
    })
})