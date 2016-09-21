$(function(){
	//初始化列表
	play.initList();
	//初始化隐藏的播放列表
	play.initSongList();
	
})
var play = {
	initList : function(curr){
		var curr = curr || 1 ;
		$.ajax({
			type: "POST",
			url: "user/history/list?page="+curr,
			data : JSON.stringify({ 'id':'-1'}),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				var objs = data.list.list;
				$('.music-cont-ls').empty();
				var html = "";
				$.each(objs , function(index , item){
					html += "<li class='music-cont-ls-li play-li'  song='"+item.songName+"' singerName='"+item.singerName+"' songId='"+item.songId+"'  songTime='"+item.timeLength+"' songUrl='upload/"+item.songUrl+"' songMoney='"+item.songCost+"' >";
					html += "<ul class='music-cont-info-ls'>";
					html += "<li class='music-cont-info-ls-i1'>";
					html += "<a href='javascript:void(0);'>";
					html += "<i class='icomoon info-label label-music'>&#xe911</i>";
					html += "</a></li>";
					html += "<li class='music-cont-info-ls-i2'>";
					html += "<a href='javascript:void(0);'>"+item.songName+"</a>";
					html += "</li>";
					html += "<li class='music-cont-info-ls-i3'>";
					html += "<a href='javascript:void(0);'>"+item.singerName+"</a>";
					html += "</li>";
					html += "<li class='music-cont-info-ls-i4'>";
					html += "<a href='javascript:void(0);'>"+item.songType+"</a>";
					html += "</li>";
					html += "<li class='music-cont-info-ls-i5'>";
					html += "<a href='javascript:void(0);'>"+item.timeLength+"</a>";
					html += "</li>";
					html += "<li class='music-cont-info-ls-i6'>";
					html += "<a href='javascript:void(0);'>";
					html += "<i class='icomoon info-label label-heart' data-favorite='0'>&#xe9da</i>";
					html += "</a></li>";
					html += "</ul></li>";
				});
				$('.music-cont-ls').append(html);
				//分页
				laypage({
				    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
				    pages: data.list.pages, //总页数
				    skip: true, //是否开启跳页
				    skin: '#AF0000',
				    curr: curr || 1, //当前页
				    groups: 3 ,//连续显示分页数
				    jump: function(obj, first){ //触发分页后的回调
		                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
		                    initList(obj.curr);
		                }
		            }
				});
				//点击某一条，让他去播放
				play.clickLi();
			}
		});
	},
	initSongList : function(){
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
					$('.music-cont-ls .play-li').eq(0).addClass('active').find('.label-music').addClass('active');

				}
			},
			error : function(){

			}
		});
	},
	clickLi : function(){
		$('.play-li').each(function(index , item){
			$(this).off('click').on('click' , function(){
				$('.play-li').each(function(){
					$(this).removeClass('active');
					$(this).find('.music-cont-info-ls-i1').find('i').removeClass('active');
				})
				var songUrl = $(this).attr('songUrl');
				$('#musicList li').each(function(index , item){
					var $li = $(this);
					if(songUrl == $li.attr('songUrl') ){
						$('#music').attr('src' , $li.attr('songUrl'));
						$(".music-singer").html($li.attr('singerName'));
						$(".music-name").html($li.html());
						$('#music')[0].play();
					}
				});
				$(this).addClass('active').find('.label-music').addClass('active');
			});
		})
	}
}

				