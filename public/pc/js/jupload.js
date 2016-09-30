/**
 * Created by Administrator on 2016/9/30 0030.
 */
$(function () {
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
});
