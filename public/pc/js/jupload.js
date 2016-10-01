/**
 * Created by Administrator on 2016/9/30 0030.
 */


$(function () {
  //上传图片
  $('#file_upload').fileupload({
    acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
    imageMinWidth:600,
    done: function (e, data) {
      $.each(data.result.files, function (index, file) {
        $('<p/>').text(file.name).appendTo(document.body);
      });
    }
  }).bind('fileuploadprocessstart', function (e) {
    console.log(fileuploadprocessstart)
  })
    .bind('fileuploadprocess', function (e, data) {
      console.log(fileuploadprocessstart)
    })
    .bind('fileuploadprocessdone', function (e, data) {
      console.log(fileuploadprocessstart)
    })
    .bind('fileuploadprocessfail', function (e, data) {
      console.log(fileuploadprocessstart)
    })
    .bind('fileuploadprocessalways', function (e, data) {
      console.log(fileuploadprocessstart)
    })
    .bind('fileuploadprocessstop', function (e) {
      console.log(fileuploadprocessstop)
    });


  //新建相册
  $('.popCreateAlbum').click(function(){
    layer.open({
      type: 1, //page层
      area: ['500px', '213'],
      title: '创建新相册',
      shade: 0.6, //遮罩透明度
      moveType: 1, //拖拽风格，0是默认，1是传统拖动
      shift: -1, //0-6的动画形式，-1不开启
      content: $('.form-horizontal')
    });
  })

  $('.resetalbums').click(function(){
    layer.closeAll()
  })

  $('.submitalbums').click(function(){

    var params = $('.form-horizontal').serializeArray();
    var data = {};
    params.map(function (val, i) {
      data[val.name] = val.value;
    });
    $.ajax('/rest/albums',data,function(response){
        console.log(response)
    })
  })

});
