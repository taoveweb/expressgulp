(function (){
	  var el = document.createElement('input');
	  support = {
	    autofocus: 'autofocus' in el,
	    placeholder : 'placeholder' in el,
	    multiple : 'multiple' in el,
	    touch : 'ontouchstart' in window,
	    applicationcache : !!window.applicationCache,
	    fullscreen : 'fullscreen' in document || 'webkitIsFullScreen' in document || 'mozFullScreen' in document,
	    localStorage : 'localStorage' in window && window.localStorage !== null,
	    transition: (function(){
	    	var props = ['transition', 'WebkitTransition', 'MozTransition', 'MsTransition', 'OTransition'];
		    for(var i in props)
		    	if (props[i] in el.style)
		    		return true;
		    return false;
		})()
	  };
	})();

/**
 * 添加标签的函数
 * @param els
 * @param tags
 * @return
 */
function addTags(els,tags){
	els.each(function(el){
		var list=el.value.split(' ');
		if(!list.contains(tags.value))
			list.push(tags.value);
		el.value = list.join(' ');
	});
}

var uploadController = {
	onUploadStart : function(){
		//$('#postText').show();
    	//$('#file_upload_button').removeClass('uploadifyButton');
    	$('.uploadifyButtonText').html('上传更多照片');
    	//dialog.el.find('button[type=submit]').show();
    	$('.in-step-1').hide();
    	$('.in-step-2').show();

    	//if (this.fileList.length == 0) {
		//		return false;//这里虽然终止了，但是实际上flash控制的过程已经开始。
		//	}

			//window.onbeforeunload = $lambda('您还没有保存，真的要放弃保存吗？按[确定]直接离开，按[取消]回到当前页');

			//$('.container').removeClass('step-1').addClass('step-2');
	},
	onUploadSuccess : function(data){
		var json = $.parseJSON(data);
		if (json.result !== 'SUCCESS') {
			alert(json.message || data);
			return;
		}

        $(twig({ ref: 'uploader-completed-item' }).render(json.image).toString()).appendTo($('#fileList'));
	},
	checkMultiPhotos : function(){
		var imageCount = $('.uploader-queue-item').length + $('#fileList .file, #fileList .post').length;
		$('.form-group-content')[imageCount > 1 ? 'show' : 'hide']();
		$('.upload-prompt')[imageCount == 0 ? 'show' : 'hide']();
	}
};

function initUpload(el){
	var xhr = new XMLHttpRequest(),
		isBrokenBrowser = function (){
			switch(navigator.appName){
			case 'Microsoft Internet Explorer':
				switch (true){
				case navigator.userAgent.indexOf('SE 2.X MetaSr 1.0') > -1:// 搜狗浏览器和IE10配合时，4.1会出现文件部分上传的错误，4.2会出现进度条瞬间到100%的问题，因此关闭搜狗浏览器
					return true;
				default:
				}
				break;
			default:
			}
			return false;
		};
if (support.multiple && typeof FormData !== 'undefined' && xhr.upload !== undefined && !isBrokenBrowser()){
	var queueEl = $('.uploader-file-queue');
	queueEl.delegate('.uploader-queue-item .cancel', 'click', function(){
		$(this).closest('.uploader-queue-item').remove();
	});
	el.change(function(){
		var params = {
			'user_id':visitor.id
		};

		function uploadOneFile(el){
			var file = el.data('file'),
				fd = new FormData();

			for(var key in params)
				fd.append(key, params[key]);
	        fd.append( 'photoupload', file );

	        function uploadNext(){
		        if (el.next()[0])
					uploadOneFile(el.next());
		    }

	        var xhr = new XMLHttpRequest(),
	        	events = {
	        		'error'	: function(pe){alert('连接不到服务器，请检查你的网络连接')},
	        		'load'	: function(pe){
	    				var s = pe.target.status;
	    				if (s >= 200 && s < 300 || s == 304){
	    					uploadController.onUploadSuccess(this.responseText);

	    					uploadNext();
	    					el.remove();
	    				}
	    				else{
	    					var dict = {
	    						413:'文件尺寸过大',
	    						500:'服务器内部错误，请通知管理员',
	    						502:'服务器网关错误，请通知管理员'
	    					};
	    					alert(dict[s] || pe.target.statusText);
	    				}
	    			}
	    			//'abort','loadstart','loadend','progress','timeout'
	        	};

			for (var event in events)
				xhr.addEventListener(event, events[event], false);

			xhr.upload.addEventListener('progress', function(pe){
				if(pe.lengthComputable){
					var percentage = Math.round(pe.loaded / pe.total * 100);
					el.find('.data').html(percentage + '%');
					el.find('.uploadifyProgressBar').css('width', percentage + '%');
				}
			});

			el.find('.cancel').click(function(){
				xhr.abort();
				uploadNext();
				el.remove();
				return false;
			});

			xhr.open('POST', TuchongClient.restAPI + 'images', true);
			xhr.setRequestHeader("Cache-Control", "no-cache");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			//设置了这句话之后表单中的其他信息无法正常提交
			//http://stackoverflow.com/questions/18590630/xmlhttprequest-multipart-form-data-invalid-boundary-in-multipart
			//xhr.setRequestHeader("Content-Type", 'multipart/form-data');
			xhr.send(fd);

			el.addClass('uploading');
		}

		$.each(this.files, function(){
			if (this.type && $.inArray(this.type, ['image/jpeg']) === -1){	//	IE11无法获取this.type值，暂时忽略掉
				alert(this.name + '的格式是' + this.type + '，只支持上传JPG格式图片');
				return;
			}
			if (this.size > 20 * 1024 * 1024){
				alert(this.name + '的大小是' + formatUnit(this.size) + '，最大支持上传20MB图片');
				return;
			}
			var context = {
				fileName:this.name,
				fileSize:formatUnit(this.size)
			};
            $(twig({ ref: 'uploader-uploading-item' }).render(context).toString()).appendTo(queueEl).data('file', this);
		});

		if (queueEl.find('.uploader-queue-item')[0] && !queueEl.find('.uploading')[0]){
			uploadOneFile($(queueEl.find('.uploader-queue-item')[0]));
			uploadController.onUploadStart();
		}
		uploadController.checkMultiPhotos();

		this.value = '';
	});
}
else{
  el.uploadify({
    'swf'  		: '/uploadify.swf',
    'uploader'  : web_root + 'rest/images',
    'cancelImage': style_root + 'uploadify-cancel.png',
    'auto'      : true,
    'multi'		: true,
    'checkExisting':false,
    'fileSizeLimit': '20MB',
    'queueSizeLimit': 30,
    'fileObjName':'photoupload',
    'postData'	: {'user_id':visitor.id},
    'buttonText': '上传照片',
    'buttonCursor': 'pointer',
    'fileTypeDesc':'JPEG格式',
    'fileTypeExts':'*.jpg; *.jpeg; *.JPG; *.JPEG',
    'removeTimeout': 0,
    'onInit': function(){},
    'onSWFReady':function(){return ;
    	$('#upload-form').addClass('has-flash');

		switch (mode) {
			case 'flash':
				this.flashEnabled = true;//确定使用flash
				$('#upload-form').addClass('with-flash');
				$('#upload-status').getElement('.status-current').show('block');
				break;
			case 'traditional':
				this.flashEnabled = false;//虽然有flash支持，但是不使用
				break;
			default:
		}
    },

    'onSelect':function(file){
    	uploadController.checkMultiPhotos();
    },

    'onSelectError':function(file,errorCode,errorMsg){
    	/*files.each(function(file) {
			new Element('li', {
				'class': 'validation-error',
				html: errorMsg || errorCode,
				title: '删除标题',
				activity: {
					click: function() {
						this.destroy();
					}
				}
			}).inject(this.list, 'top');
		}, this);*/
    },

    'onUploadStart':function(file){
    	uploadController.onUploadStart();
    },

    'onUploadProgress':function(){},

    'onUploadComplete':function(file, queue){
    	//creationdate,filestatus,post,id,type,index,size,modificationdate,name
    	return;
    	//window.onbeforeunload = $empty;//去掉关闭提醒事件
		//$('.container').removeClass('step-2').addClass('step-3');//出现下一步按钮，点击进入下一步,同时禁止点击新的文件
		TagSuggest($('#batchTags').tags,$('#tagSuggest').getElements('a'));
    },

    'onUploadError':function(file,errorCode,errorMsg,errorString,queue){},

    'onUploadSuccess':function(file,data, response){
    	uploadController.onUploadSuccess(data);
    },

    'onUploadCancel': function(){
    	//暂时不支持中断上传
    },

    'onQueueComplete' : function(){
    	//重新显示上传按钮
    }
  });
}

  //uploadify的init函数不可用，因此在这里处理
	var autosave = function(e){
		var fileEl = $(e.target).closest('li.file');
		fileEl.find('.file-saving').show();

		Tuchong.post('image/update/',
			{
				'img_id':json.image.id,
				'description':fileEl.find('.file-description').val(),
				'tags':	fileEl.find('.file-tags').val()
			},
			function(rsp,txt){
				switch (rsp.result){
				case 'SUCCESS':
					fileEl.find('.file-saving').hide();
					fileEl.find('.file-description').attr('readOnly', false);
					//fileEl.find('.file-tags').attr('readOnly', false);
					break;
				default:
					alert(rsp.message);
				}
			});

		this.attr('readOnly',true);
	};

    $('.uploader-image-list').delegate( '.btn-delete', 'click', function(){
        var el = $(this).closest('.post');
        el.remove();
    });
}
