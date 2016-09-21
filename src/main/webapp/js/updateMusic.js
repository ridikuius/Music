$(function(){
	// update.musicValide();
	//点击发布按钮
	update.publish();
	//初始化类型标签
	update.initType();
	//类型标签点击切换效果
	// update.typeSwitch();
	//关闭添加类型弹出框
	update.addTypeClose();
	//打开添加类型弹出框
	update.showAddType();
	//。。。。。。。。。。。。。。。。。。
	update.musicFile();
	//取消发布
	update.publishCancel();
	//退出
	update.quite();
	update.clickSetInfo();

})
var update = {
	music : {},
	musicValide : function(){
		var msg = '';
		var musicName = $('#musicName').val();
		if(!musicName.trim()){
			$('.warn1').css('visibility' , 'visible');
			return false;
		}
		msg = update.validate(musicName);
		if(msg != '合法'){
			$('.warn1').html(msg).css('visibility' , 'visible');
			return false;
		}

		var musicSinger = $('#musicSinger').val();
		if(!musicSinger.trim()){
			$('.warn2').css('visibility' , 'visible');
			return false;
		}
		msg = update.validate(musicSinger);
		if(msg != '合法'){
			$('.warn2').html(msg).css('visibility' , 'visible');
			return false;
		}

		var musicMoney = $('#musicMoney').val();
		if(!musicMoney.trim()){
			$('.warn3').css('visibility' , 'visible');
			return false;
		}
		msg = update.validate(musicMoney , 'num');
		if(msg != '合法'){
			$('.warn3').html(msg).css('visibility' , 'visible');
			return false;
		}

		var musicTypeId ='';
		$("#musicType li").each(function(index , item){
			if($(this).hasClass('active')){
				 musicTypeId= $(this).attr('data-typeid');
			}
		})

		if($('#form').attr('data-type')==0){
			$('.publish-warn .warn10').css('visibility' , 'visible');
			return false;
		}

		/*var musicLogo = document.getElementById('musicLogo').files[0];
		if(!musicLogo){
			$('.publish-warn .warn10').css('visibility' , 'visible');
			return false;
		}
		var logo = musicLogo.name;*/
		update.music.songName = musicName;
		update.music.singerName = musicSinger;
		update.music.songCost = musicMoney;
		update.music.typeId = musicTypeId;
		// update.music.musicLogo = logo;
	},
	validate : function( str , num){
		var msg = '合法';
		var reg = /\d+/;
		if(!num){
			if(update.len(str) > 20){
				msg = '不能超过20个字符';
				return msg;
			}
		}else{
			if(!reg.test(str)){
				msg = '输入的数字不合法'
				return msg;
			}
		}
		return msg;
	},
	len : function(str){
		var len = 0;  	
		for( var i=0; i<str.length ; i++){
			if (str[i].charCodeAt(i)>127 || str[i].charCodeAt(i)==94) {  
	        	len += 2;  
	    	} else {  
	       		len ++;  
	    	} 
		}	  
		return len;
	},
	publish : function(){
		$('#publishOk').off('click').on('click' , function(){
			$('.publish-warn p').each(function(index ,item){
				$(this).css('visibility' , 'hidden');
				$('.warn5').css('visibility' , 'visible')
			})
			update.musicValide();
			var music = update.music;
			console.log(music);
			// ajaxUpload.submit();
			$.ajax({
				type: "post",
				url: "uploadSave",
				data : JSON.stringify(update.music),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(obj){
					alert('上传成功');
					window.location = 'admin';
				},
				error : function(){
					console.log('error');
				}
			});
			
		});
	},
	
	typeSwitch : function(){
		$('#musicType li').each(function(index , item){
			$(this).off('click').on('click' , function(){
				$('#musicType li').each(function(index , item){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
			});
		})
	},
	initType : function(){
		// <li class='shop-type active' id='1'><a href='javascript:void(0);'>抒情</a></li>
		var html = '';
		$.ajax({
			type: "get",
			url: "songType",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(obj){
				var data = obj.songTypeList;
				$.each(data , function(index , item){
					html += "<li class='shop-type' data-typeid='"+item.id+"'><a href='javascript:void(0);'>"+item.name+"</a></li>";
				})
				$("#musicType").append(html).find('li').eq(0).addClass('active');
				var num = Math.floor(data/5);
				if(num>=1){
					$('.img-label').css('margin-top' , num*45);
					$('.warn10').css('margin-top' , num*45);
				}
				update.typeSwitch();
				
			},
			error : function(){
				console.log('error');
			}
		});
	},
	showAddType:function(){
		$('.publish-warn .warn5 a').off('click').on('click' , function(){
			$('.add-type-wrap').show();
		})
		$('#addType').off('click').on('click' , function(){
			if($('#type').val().trim()){
				var type = {'name':$('#type').val()}
				$.ajax({
					type: "post",
					url: "addType",
					data : JSON.stringify(type),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(obj){
						$(".add-type-wrap").hide();
						$('.add-type-suc').show();
						window.location = 'uploadMusic';
					},
					error : function(){
						console.log('error');
					}
				});
			}
			
		})
	},
	addTypeClose : function(){
		$('.add-type-close').off('click').on('click' , function(){
			$('.add-type-wrap').hide();
		})
	},
	//上传歌曲
	musicFile : function(){
		$('.fileBtn').off('click').on('click' , function(){
			var musicLogo = document.getElementById('musicLogo').files[0];
			if(!musicLogo){
				$('.publish-warn .warn10').css('visibility' , 'visible');
				return false;
			}
			// var fileObj = musicLogo.name;
			/*$('#form').action = 'upload';
			$('#form').submit();
			$('#form').attr('data-type' , '1');
			alert('上传成功');*/

		})
	},
	publishCancel : function(){
		$('#publishCancel').off('click').on('click' , function(){
			window.location = 'admin';
		})
	},
	quite : function(){
		$('#quite').off('click').on('click' , function(){
			$.cookie('user' , '');
			$.ajax({
				type: "POST",
				url: "user/quit",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data){
					window.location = 'list';
				},
				error : function(){

				}
			});
		})
	},
	//鼠标点击个人部分
	clickSetInfo : function(){
		$("#headerArrow").off('click').on('click' , function(e){
			if($(this).attr('type') == 0){
				$(this).html("&#xea43").attr('type' , '1');
			}else{
				$(this).html("&#xea41").attr('type' , '0');
			}
			$(".info").toggle();
			e.stopPropagation();
		});
		$(document).off('click').on('click' , function(){
			$("#headerArrow").html("&#xea41");
			$(".info").hide();
			$(".header-info-ls-set").hide();
		})
	}
};

var ajaxUpload = new AjaxUpload($("#musicLogo"),{
	action: 'upload', //要提交的地址
	name: 'file',//参数名次
	// data: update.music,//和文件一起提交的其它参数
	autoSubmit: true,//选中文件后是否就提交
	responseType: false,//返回的相应格式，如果是text格式的，会在响应前后加上一个<pre></pre>标签
	hoverClass: 'hover',
	disabledClass: 'disabled',
	onChange: function(file, extension){//在选中了文件的时候触发
	},
	onSubmit: function(file, extension){//在提交的时候触发

	},
	onComplete: function(file, response){//上传结束的时候触发
		alert('成功')
		return ;
	}
});
	