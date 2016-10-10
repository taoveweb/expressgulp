/**
 * Created by Administrator on 2016/9/30 0030.
 */


$(function () {
  //上传图片

  $('#file_upload').fileupload({
    acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
    imageMinWidth: 600,
    progressall: function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      $('#progress .bar').css(
        'width',
        progress + '%'
      ).html(progress + '%');
    },
    done: function (e, data) {
      var result = data.result;
      if (result.msg == "已经存在这张图片了") {
        layer.msg('此图片已经存在');
        return;
      }
      var html = '<li class="post file" >\
        <input type="hidden" name="images[order]" value="0">\
        <span class="thumb">\
        <img src="' + imghost + result.imgUrl.replace('.', '_90.') + '">\
        </span>\
        <div class="meta">\
        <textarea class="form-control description" name="images[description]" placeholder="照片描述"></textarea>\
        </div>\
        <a class="ir btn-delete" >删除</a>  <a class="ir btn-sort">排序</a>\
        </li>'

      $('#fileList').append(html)
    }
  }).bind('fileuploadprocessstart', function (e) {
    console.log('fileuploadprocessstart')
  })
    .bind('fileuploadprocess', function (e, data) {
      console.log('fileuploadprocess')
    })
    .bind('fileuploadprocessdone', function (e, data) {
      console.log('fileuploadprocessdone')
    })
    .bind('fileuploadprocessfail', function (e, data) {
      console.log('fileuploadprocessfail')
    })
    .bind('fileuploadprocessalways', function (e, data) {
      console.log('fileuploadprocessalways')
    })
    .bind('fileuploadprocessstop', function (e) {
      console.log('fileuploadprocessstop')
    });


  //新建相册
  $('.popCreateAlbum').click(function () {
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

  //从相册中选取
  $('#upload-album').click(function () {
    layer.open({
      type: 1, //page层
      area: ['605px', '213'],
      title: false,
      closeBtn: false,
      btn: false,
      shade: 0.6, //遮罩透明度
      moveType: 1, //拖拽风格，0是默认，1是传统拖动
      shift: -1, //0-6的动画形式，-1不开启
      content: $('#divImageBlocks')
    });
  });

  //关闭弹窗
  $('.resetalbums,.closeAlbums,.x-delete').click(function () {
    layer.closeAll()
  });

  //图片排序

  var adjustment;

  $("#fileList").sortable({
    group: '#fileList',
    vertical:true,
    pullPlaceholder: false,
    // animation on drop
    onDrop: function  ($item, container, _super) {
      var $clonedItem = $('<li/>').css({height: 0});
      $item.before($clonedItem);
      $clonedItem.animate({'height': $item.height()});

      $item.animate($clonedItem.position(), function  () {
        $clonedItem.detach();
        _super($item, container);
      });
    },

    // set $item relative to cursor position
    onDragStart: function ($item, container, _super) {
      var offset = $item.offset(),
        pointer = container.rootGroup.pointer;

      adjustment = {
        left: pointer.left - offset.left,
        top: pointer.top - offset.top
      };

      _super($item, container);
    },
    onDrag: function ($item, position) {
      $item.css({
        left: position.left - adjustment.left,
        top: position.top - adjustment.top
      });
    }
  });







  $('.submitalbums').click(function () {
    var params = $('.form-horizontal').serializeArray();
    var data = {};
    params.map(function (val, i) {
      data[val.name] = val.value;
    });
    $.ajax('/rest/albums', data, function (response) {
      console.log(response)
    })
  })

});
