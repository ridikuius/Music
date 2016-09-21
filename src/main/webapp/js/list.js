$(function(){
	list.initLoad();
	list.searchFrameClick();
	list.getSearch();
	//点击导航栏
	list.listNav()
	list.initSongList();
})
var list = {
	initLoad : function(){
		var song = $.cookie('songObj');
		var key = $.cookie('key');
		console.log(song);
		//点击首页任一条进入列表页
		if(song){
			$.cookie('songObj','');
			var songObj = {};
			var keyArr = song.split('&');
			$.each(keyArr , function(index , item){
				var key = item.split('=')[0];
				var value = item.split('=')[1];
				songObj[key] = value;
			});
			var item = { songName : songObj.song , songId : songObj.songId , songUrl : songObj.songUrl , singerName : songObj.singer ,songType : songObj.songType , songTime:songObj.songTime ,songCost:songObj.songCost}
			$('.list-music-ls').empty();
			var html = ""
			html += "<li class='music-cont-ls-li' song='"+item.songName+"' singerName='"+item.singerName+"' songId='"+item.songId+"'  songTime='"+item.timeLength+"' songUrl='upload/"+item.songUrl+"' songMoney='"+item.songCost+"'>";
			html += "<ul class='music-cont-info-ls'>";
			html += "<li class='music-cont-info-ls-i1'>";
			html += "<i class='icomoon info-label label-music'>&#xe911</i>";
			html += "</li>";
			html += "<li class='music-cont-info-ls-i2'>"+item.songName+"</li>";
			html += "<li class='music-cont-info-ls-i3'>"+item.singerName+"</li>";
			html += "<li class='music-cont-info-ls-i4'>"+item.songType+"</li>";
			html += "<li class='music-cont-info-ls-i5'>"+item.songTime+"</li>";
			html += "<li class='music-cont-info-ls-i7'>￥"+item.songCost+"</li>";
			html += "<li class='music-cont-info-ls-i6'><a href='javascript:void(0);'>";
			html += "<i class='icomoon info-label label-heart' data-favorite='0'>&#xe9da</i></a></li>";
			html += "<li class='music-cont-info-ls-i8'><a href='javascript:void(0);'>";
			html += "<i class='icomoon info-label label-download' data-favorite='0'>&#xea36</i></a></li>";
			html += "</ul></li>";
			$('.list-music-ls').append(html);
			//加整条点击事件
			list.clickOne();
			//加滑动事件
			list.hoverLi();
			//加下载事件
			common.download();
		}else{
			//搜索进入列表页
			if(key){
				$.cookie('key','');
				var curr = curr || 1 ;
				headSearch(key , curr);
				function headSearch(key , curr){
					var curr = curr || 1 ;
					$.ajax({
						type: "GET",
						url: 'select?search='+key+'&page='+curr,
						// data : JSON.stringify({'search':key}),
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						success: function(data){
							var obj = data.pageInfo.list;
							$('.list-music-ls').empty();
							list.describeHtml(obj);
							//分页
							laypage({
							    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
							    pages: data.pageInfo.pages, //总页数
							    skip: true, //是否开启跳页
							    skin: '#AF0000',
							    curr: curr || 1, //当前页
							    groups: 3 ,//连续显示分页数
							    jump: function(obj, first){ //触发分页后的回调
					                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
					                	var key = $('.list-search').val();
					                    headSearch(key , obj.curr);
					                }
					            }
							});
						},
						error : function(){

						}
					});
				}
			}else{
				//点击导航栏进入列表页
				clickNav();
				function clickNav(curr){
					var curr = curr || 1;
					$.ajax({
					type: "GET",
					url: "songlist?page="+curr,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						var obj = data.pageInfo.list;
						$('.list-music-ls').empty();
						list.describeHtml(obj);
						//分页
						laypage({
						    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
						    pages: data.pageInfo.pages, //总页数
						    skip: true, //是否开启跳页
						    skin: '#AF0000',
						    curr: curr || 1, //当前页
						    groups: 3 ,//连续显示分页数
						    jump: function(obj, first){ //触发分页后的回调
				                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
				                    clickNav(obj.curr);
				                }
				            }
						});
					},
					error : function(){

					}
				});
				}
				
			}
		}
		
	},
	initSongList : function(){
		$('#musicList').empty();
		if(!$.cookie('user')){
			return false;
		}
		$.ajax({
			type: "POST",
			url: "user/history/all/list",
			data : JSON.stringify({ 'id':'-1'}),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				$('#musicList').empty();
				var html = '';
				var objs = data.list;
				$.each(objs , function(index , item){
					html += "<li songUrl='upload/"+item.songUrl+"' singerName='"+item.singerName+"' >"+item.songName+"</li>";
				});
				$("#musicList").append(html);
				//如果历史有记录的话，默认播放第一首歌曲
				if(!$("#music").attr('src')){
					var $li = $("#musicList li").eq(0);
					$('#music').attr('src' , $li.attr('songUrl'));
					$(".music-singer").html($li.attr('singerName'));
					$(".music-name").html($li.html());
					$('#music')[0].play();
				}
			},
			error : function(){

			}
		});
	},
	listNav : function(){
		//导航点击事件
		function removeClass(){
			$('#listNav li').each(function(index , item){
				$(this).removeClass('active');
			});
		}
		$('#defaultMusic').off('click').on('click' , function(){
			removeClass();
			$(this).parent().removeClass('active');
			funList();
			function funList(curr){
				var curr = curr || 1;
				$.ajax({
					type: "POST",
					url: "songlist?page="+curr,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						var obj = data.pageInfo.list;
						$('.list-music-ls').empty();
						list.describeHtml(obj);
						//分页
						laypage({
						    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
						    pages: data.pageInfo.pages, //总页数
						    skip: true, //是否开启跳页
						    skin: '#AF0000',
						    curr: curr || 1, //当前页
						    groups: 3 ,//连续显示分页数
						    jump: function(obj, first){ //触发分页后的回调
				                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
				                    funList(obj.curr);
				                }
				            }
						});
					},
					error : function(){

					}
				});
			}
			
		});
		//点击搜索次数
		$('#souMusic').off('click').on('click' , function(){
			removeClass();
			$(this).parent().removeClass('active');
			souMusic();
			function souMusic(curr){
				var curr = curr || 1;
				$.ajax({
					type: "POST",
					url: 'showList?sort=searchCount&page='+curr,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						var obj = data.pageInfo.list;
						$('.list-music-ls').empty();
						list.describeHtml(obj);
						//分页
						laypage({
						    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
						    pages: data.pageInfo.pages, //总页数
						    skip: true, //是否开启跳页
						    skin: '#AF0000',
						    curr: curr || 1, //当前页
						    groups: 3 ,//连续显示分页数
						    jump: function(obj, first){ //触发分页后的回调
				                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
				                    souMusic(obj.curr);
				                }
				            }
						});
					},
					error : function(){

					}
				});
			}
		});
		//点击播放次数
		$('#playMusic').off('click').on('click' , function(){
			removeClass();
			$(this).parent().removeClass('active');
			playCount();
			function playCount(curr){
				var curr = curr || 1;
				$.ajax({
					type: "POST",
					url: 'showList?sort=playCount&page='+curr,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						var obj = data.pageInfo.list;
						$('.list-music-ls').empty();
						list.describeHtml(obj);
						//分页
						laypage({
						    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
						    pages: data.pageInfo.pages, //总页数
						    skip: true, //是否开启跳页
						    skin: '#AF0000',
						    curr: curr || 1, //当前页
						    groups: 3 ,//连续显示分页数
						    jump: function(obj, first){ //触发分页后的回调
				                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
				                    playCount(obj.curr);
				                }
				            }
						});
					},
					error : function(){

					}
				});
			}
		});
		//点击下载次数
		$('#downMusic').off('click').on('click' , function(){
			removeClass();
			$(this).parent().removeClass('active');
			downloadCount();
			function downloadCount(curr){
				var curr = curr || 1;
				$.ajax({
					type: "POST",
					url: 'showList?sort=downloadCount&page='+curr,
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						var obj = data.pageInfo.list;
						$('.list-music-ls').empty();
						list.describeHtml(obj);
						//分页
						laypage({
						    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
						    pages: data.pageInfo.pages, //总页数
						    skip: true, //是否开启跳页
						    skin: '#AF0000',
						    curr: curr || 1, //当前页
						    groups: 3 ,//连续显示分页数
						    jump: function(obj, first){ //触发分页后的回调
				                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
				                    downloadCount(obj.curr);
				                }
				            }
						});
					},
					error : function(){

					}
				});
			}
		});
		/*function funAjax(url){
			$.ajax({
				type: "POST",
				url: url,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data){
					var obj = data.pageInfo.list;
					$('.list-music-ls').empty();
					list.describeHtml(obj);
				},
				error : function(){

				}
			});
		}*/
		
	},
	describeHtml : function(data){
		var html = ""
		$.each(data , function(index , item){
			html += "<li class='music-cont-ls-li' song='"+item.songName+"' singerName='"+item.singerName+"' songId='"+item.songId+"'  songTime='"+item.timeLength+"' songUrl='upload/"+item.songUrl+"' songMoney='"+item.songCost+"' >";
			html += "<ul class='music-cont-info-ls'>";
			html += "<li class='music-cont-info-ls-i1'>";
			html += "<i class='icomoon info-label label-music'>&#xe911</i>";
			html += "</li>";
			html += "<li class='music-cont-info-ls-i2'>"+item.songName+"</li>";
			html += "<li class='music-cont-info-ls-i3'>"+item.singerName+"</li>";
			html += "<li class='music-cont-info-ls-i4'>"+item.songType+"</li>";
			html += "<li class='music-cont-info-ls-i5'>"+item.timeLength+"</li>";
			html += "<li class='music-cont-info-ls-i7'>￥"+item.songCost+"</li>";
			html += "<li class='music-cont-info-ls-i6'><a href='javascript:void(0);'>";
			html += "<i class='icomoon info-label label-heart' data-favorite='0'>&#xe9da</i></a></li>";
			html += "<li class='music-cont-info-ls-i8'><a href='javascript:void(0);'>";
			html += "<i class='icomoon info-label label-download' data-favorite='0'>&#xea36</i></a></li>";
			html += "</ul></li>";
		})
		$('.list-music-ls').append(html);
		//加整条点击事件
		list.clickOne();
		//加滑动事件
		list.hoverLi();
		//加下载事件
		common.download();
	},
	searchFrameClick : function(){
		$(".list-search").off('click').on('click' , function(e){
			$('.list-tishi').hide();
			e.stopPropagation();
		});
		$('.list-tishi').off('click').on('click' , function(e){
			$(this).hide();
			$(".list-search").focus();
			e.stopPropagation();
		});
		$(document).off('click').on('click' , function(){
			$(".list-tishi").show();
		})
	},
	getSearch : function(){
		//点击搜索按钮进行搜索
		$('.list-search-label').off('click').on('click' , function(){
			var key = $('.list-search').val();
			if(!key){
				return false;
			}
			var curr = curr || 1 ;
			clickSearchBtn(key , curr);
			function clickSearchBtn(key , curr){
				var curr = curr || 1 ;
				$.ajax({
					type: "GET",
					url: 'select?search='+key+'&page='+curr,
					// data : JSON.stringify({'search':key}),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						var obj = data.pageInfo.list;
						$('.list-music-ls').empty();
						list.describeHtml(obj);
						//分页
						laypage({
						    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
						    pages: data.pageInfo.pages, //总页数
						    skip: true, //是否开启跳页
						    skin: '#AF0000',
						    curr: curr || 1, //当前页
						    groups: 3 ,//连续显示分页数
						    jump: function(obj, first){ //触发分页后的回调
				                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
				                	var key = $('.list-search').val();
				                    clickSearchBtn(key , obj.curr);
				                }
				            }
						});
					},
					error : function(){

					}
				});
			}
		});
		//输入回车搜索
		$('.list-search').keydown(function(e){
			if(e.keyCode == 13){
				var key = $('.list-search').val();
				if(!key){
					return false;
				}
				var curr = curr || 1 ;
				enterSearch(key , curr);
				function enterSearch(key , curr){
					var curr = curr || 1 ;
					$.ajax({
						type: "GET",
						url: 'select?search='+key+'&page='+curr,
						// data : JSON.stringify({'search':key}),
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						success: function(data){
							var obj = data.pageInfo.list;
							$('.list-music-ls').empty();
							list.describeHtml(obj);
							//分页
							laypage({
							    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
							    pages: data.pageInfo.pages, //总页数
							    skip: true, //是否开启跳页
							    skin: '#AF0000',
							    curr: curr || 1, //当前页
							    groups: 3 ,//连续显示分页数
							    jump: function(obj, first){ //触发分页后的回调
					                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
										var key = $('.list-search').val();
					                    enterSearch(key , obj.curr);
					                }
					            }
							});
						},
						error : function(){

						}
					});
				}
			}
		});
		/*function seaFunc(key , curr){
			var curr = curr || 1 ;
			$.ajax({
				type: "GET",
				url: 'select?search='+key+'&page='+curr,
				// data : JSON.stringify({'search':key}),
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data){
					var obj = data.pageInfo.list;
					$('.list-music-ls').empty();
					list.describeHtml(obj);
					//分页
					laypage({
					    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
					    pages: data.pageInfo.pages, //总页数
					    skip: true, //是否开启跳页
					    skin: '#AF0000',
					    curr: curr || 1, //当前页
					    groups: 3 ,//连续显示分页数
					    jump: function(obj, first){ //触发分页后的回调
			                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
			                    seaFunc(obj.curr);
			                }
			            }
					});
				},
				error : function(){

				}
			});
		}*/
	},
	clickOne : function(){
		$('.music-cont-ls-li').each(function(index , item){
			$(this).off('click').on('click' , function(e){
				var songName = $(this).attr('song');
				var songId = $(this).attr('songId');
				var songUrl = $(this).attr('songUrl');
				var singerName = $(this).attr('singerName');

				/*$("#music").attr('src' , songUrl);
				var audio = $("#music")[0].play();
				var html = "<li singerName='"+singerName+"' songUrl='"+songUrl+"' >"+song+"</li>";
				$("#musicList").append('html');*/
				//如果已经登陆 播放列表里的东西要动态获取
				if($.cookie('user')){
					//传到数据库 加播放一次
					$.ajax({
						type: "post",
						url: "user/play",
						data: JSON.stringify({'id':Number(songId)}),
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						success: function(data){
							list.initSongList();
						}
					})
				}else{
					//如果未登陆 播放列表里的东西只是暂时存在
					var html = "<li songUrl='"+songUrl+"' singerName='"+singerName+"' >"+songName+"</li>";
					$("#musicList").append(html);
					if($("#musicList li").length == 1){
						var $li = $("#musicList li").eq(0);
						$('#music').attr('src' , $li.attr('songUrl'));
						$(".music-singer").html($li.attr('singerName'));
						$(".music-name").html($li.html());
						$('#music')[0].play();
					}
					$('#music').attr('src')
				}
				$('#success').html('已经成功添加到播放器').show();
				setTimeout(function(){
					$('#success').hide();
				} , 2000)
				e.stopPropagation();

			});
		});
		
	},
	hoverLi : function(){
		$('.music-cont-ls-li').each(function(index , item){
			$that = $(this);
			// $that.find('.music-cont-info-ls-i6').css('visibility' , 'hidden');
			common.favorite();
			$that.hover(
				//over
				function(){
					if(!$.cookie('user')){
						return false;
					}
					$(this).find('.music-cont-info-ls-i6').css('visibility' , 'visible');
					var $thatLi = $(this);
					var songId = $(this).attr('songId');
					$.ajax({
						type: "post",
						url: "user/ifCollect",
						data: JSON.stringify({'songId':songId}),
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						success: function(data){
							if(data.result){
								$thatLi.find('.label-heart').css('color' , 'red').attr('data-favorite' , '1');
								
							}
						}
					})
				},
				//out
				function(){
					if(!$.cookie('user')){
						return false;
					}
					$(this).find('.music-cont-info-ls-i6').css('visibility' , 'hidden').find('.label-heart').css('color' , '#999').attr('data-favorite' , '0');
				}
			)
		})
		
	}

}