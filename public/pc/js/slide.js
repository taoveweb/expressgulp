$(function () {
  var current = 1;
  var stop = false;
  var boxwidth=$('.widget-slide').width();

  window.setInterval(function(){
    if (stop) return;
    current = current + 1;
    $('.slide-wrapper').finish();
    slide();
  },2000);

  //向左
  $('.slide-next').click(function () {
    stop = true;
    current = current - 1;
    $('.slide-wrapper').finish();
    if (current < 1) {
      $('.slide-wrapper').css('left', '-3150px');
      current = $('.slide-item').length - 2
    }
    slide();
  });
  //向右
  $('.slide-prev').click(function () {
    stop = true;
    current = current + 1;
    slide();
  });
  //开起自动播放
  $('.widget-slide').on('mouseleave', function () {
    stop = false;
  });
  $('.slide-bullet').on('mouseenter', 'a', function () {
    stop = true;
    index=$(this).index();
    current = index + 1;
    slide();
  });

  $('.slide-indicators').on('mouseenter', 'li', function () {
    stop = true;
    index=$(this).index();
    current = index + 1;
    slide();
  });
  function slide() {
    var left = -boxwidth * current;
    $('.slide-wrapper').finish();
    $('.slide-wrapper').animate({left: left}, function () {
      $(this).finish();
      if (current >= $('.slide-item').length - 1) {
        current = 1;
        $('.slide-wrapper').css('left', -boxwidth+'px');
      }
      $('.bullet-default').eq(current - 1).addClass('bullet-active').siblings().removeClass('bullet-active');
      $('.slide-indicators li').eq(current - 1).addClass('active').siblings().removeClass('active');
     })
  }

});
