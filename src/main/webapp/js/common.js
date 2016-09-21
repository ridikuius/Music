$(function(){
	//判断是否有用户登录,将用户名放到页面上
	common.judgeUser();
	//鼠标点击个人部分
	common.clickSetInfo();
	//收藏和取消收藏
	common.favorite();
	//下载
	common.download();
	//获取回车事件
	common.getEnter();
	//接收消息
	common.reciveMsg();
	//点击出现消息框
	common.clickMsgLeaf();
	//回到首页
	common.goIndex();
	//退出登录
	common.quite();
	//最上边的那个搜索
	common.headSearch();
})
var common = {
	//判断是否有用户登录,将用户名放到页面上
	judgeUser : function(){
		var user = $.cookie('user');
		if(user){
			$("#userNone").hide();
			$("#name").html(user);
		}else{
			$("#userInfo").hide();
		}
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
			$('.header-info-msg').hide();
		})
	},
	//点击收藏
	favorite : function(){
		$(".label-heart").each(function(index , item){
			$(this).off('click').on('click' , function(e){
				var songId = $(this).closest('.music-cont-ls-li').attr('songId');
				if($(this).attr('data-favorite') == 0){
					$(this).css('color' , 'red');
					$(this).attr('data-favorite' , '1');
					collect('user/collect' , {id : songId})
				}else{
					$(this).css('color' , '#999');
					$(this).attr('data-favorite' , '0');
					collect('user/cancleCollect' , {song : songId});
				}
				e.stopPropagation();
				function collect(url , data){
					$.ajax({
						type: "post",
						url: url,
						data: JSON.stringify(data),
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						success: function(data){
							
						}
					});
				}
			});
		});
	},
	//点击下载
	download : function(){
		$(".label-download").each(function(index , item){
			$(this).off('click').on('click' , function(e){
				//如果没登陆 跳到登录页
				if(!$.cookie('user')){
					// var href = location.href.replace('show' , 'login')
					window.location = 'login';
					return false;
				}
				var $Li = $(this).closest('.music-cont-ls-li');
				//将歌曲信息记录到窗口中
				$('.frame-text p').eq(0).html($Li.attr('song')); //歌曲名称
				$('.frame-text p').eq(1).html($Li.attr('singerName'));   //歌手名称
				$('.frame-text p').eq(2).html($Li.attr('songMoney'));   //价格
				$('.frame-wrap').attr('songId' , $Li.attr('songId'));
				// 如果登录了得话 判断是否下载过
				$.ajax({
					type: "post",
					url: "user/ifDownload",
					data: JSON.stringify({'id' : $('.frame-wrap').attr('songId')}),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						if(data.result){
							var href = location.href.replace('show' , 'user/download')
							var id = Number($('.frame-wrap').attr('songId'));
							var link = href+'?id='+id;
							window.open(link);
							return false;
						}else{
							// 弹出付费窗口
							$('.frame-wrap').show();					
						}
					}
				});
				e.stopPropagation();
			})
		});
		//支付
		$('.btn-pay').off('click').on('click' , function(){
			$('.frame-wrap').hide();
			var id = $('.frame-wrap').attr('songId');
			var price = Number($('.frame-text p').eq(2).html());   //价格
			$.ajax({
				type: "post",
				url: "user/ifPay",
				data: JSON.stringify({'id':id , 'price':price}),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data){
					if(data.result){
						var href = location.href.replace('show' , 'user/download')
						var link = href+'?id='+Number(id);
						window.open(link);
						return false;
					}else{
						$('#success').html('余额不足，请到个人中心充值').show();
						setTimeout(function(){
							$('#success').hide();
						} , 2000);
						
					}
				}
			});
		});
		//取消支付
		$('.btn-cancel').off('click').on('click' , function(){
			$('.frame-wrap').hide();
		});
	},
	getEnter : function(){
		$('.search').keydown(function(e){
			if(e.keyCode == 13){
				var key = $(this).val();//不判断没有输入的情况，如果没有输入 获取全部数据
				$.cookie('key' , key);
			}
		})
	},
	reciveMsg : function(){
		$.ajax({
			type: "POST",
			url: "user/message",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				var objs = data.messageList;
				var html = '';
				$('.header-info-msg').empty();
				$.each(objs , function(index , item){
					html += "<li>";
					html += "<a href='javascript:void(0);' class='msg'>"+item.content+"</a>";
					html += "<a href='javascript:void(0);' class='msg-read' ><i class='icomoon leaf' msg-id='"+item.id+"' state='0'>&#xe9a4</i></a>";
					html += "</li>";
				});
				$('.msg-num').html(objs.length);
				$('.header-info-msg').append(html);

				$('.msg-read').each(function(index , item){
					$(item).off('click').on('click' , function(){
						$(this).find('i').css('color' , '#3ACE00')
						var id = $(this).find('i').attr('msg-id');
						$.ajax({
							type: "POST",
							url: "user/read",
							data : JSON.stringify({'id':id}),
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							success: function(data){
								
							},
							error : function(){

							}
						});
					})
				})

			},
			error : function(){

			}
		});

		
	},
	clickMsgLeaf : function(){
		$('#alarm').off('click').on('click' , function(e){
			$('.header-info-msg').show();
			e.stopPropagation();
		});
	},
	goIndex : function(){
		$('.header-logo').off('click').on('click' , function(){
			window.location = 'list';
		})
	},
	quite : function(){
		$('.info').off('click').on('click' , function(){
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
	headSearch : function(){
		$('.search').keydown(function(event){
			if(event.keyCode == 13){
				var key = $('.search').val();
				if(!key){
					return false;
				}
				$.cookie('key' , key);
				window.location = 'show';
			}
		});

	}
}