$(function(){
	major.setModel();
	major.volumeControl();
	major.playControl();
	major.btnControl();
	setInterval(major.showTime, 1000);
	major.showEndTime();
	major.setPlayBar();
});
var major = {
	
	//点击播放条
	barClick : function(){

	},
	//设置播放模式
	setModel : function(){
		$('.audio-model-set').off('click').on('click' , function(){
			$('.model').toggle()
		})
		$('.model li').off('click').on('click' , function(){
			var model = $(this).html();
			$('.audio-model-set').html(model);
			$(this).parent().hide()
		})
	},
	volume : null,
	//调节声音
	volumeControl : function(){
		var audio = $("#music")[0];
		$(".audio-volume-bar").off('click').on('click' , function(e){
			var x = e.clientX - $(this).offset().left;
			$(".volume-bar").css('width' , x+'px');
			audio.volume = x/97;
		});
		//是否静音
		$(".audio-volume-label").off('click').on('click' , function(){
			if($(this).attr('data-type')== '1'){
				$(this).attr('data-type' , '0');
				$(this).find('i').html("&#xea2a");
				major.volume = audio.volume;
				audio.volume = 0;
			}else{
				$(this).attr('data-type' , '1');
				$(this).find('i').html("&#xea26");
				audio.volume = major.volume;
			}
		})
	},
	//调节播放条
	playControl : function(){
		var audio = $("#music")[0];
		$(".audio-bar").off('click').on("click" , function(e){
			var x = e.clientX - $(this).offset().left;
			$(".bar").css('width' , x+'px');
			var arg = x/$('.audio-bar').width();
			audio.currentTime = arg * major.musicTime;
		})
	},
	//控制按钮 播放暂停按钮
	btnControl : function(){
		var audio = $("#music")[0];
		$(".options-control").off('click').on('click' , function(){
			if($(this).attr('data-type') == '1'){
				$(this).html('&#xea1c');
				$(this).attr('data-type' , '0');
				audio.pause();
			}else{
				$(this).html('&#xea1d');
				$(this).attr('data-type' , '1');
				audio.play();
			}
		})
	},
	//显示当前播放的时间
	showTime : function(){
		var audio = $("#music")[0];
		var second = 0;
		var minute = 0;
		second = Math.floor(audio.currentTime);
		//播放条颜色变化
		if(major.musicTime > 0){
			var arg = second/major.musicTime;
			var wid = $(".audio-bar").width() * arg;
			$(".bar").css('width',wid);
		}
		//判断播放完毕 并且自动播放下一首
		if(audio.ended){
			var model = $('.audio-model-set').html();
			if(model == "顺序播放"){
				//顺序播放
				var currentName = $("#music").attr('src');
				$("#musicList li").each(function(index , item){
					if($(this).attr('songUrl') == currentName){
						if(index == $("#musicList li").length-1){
							var $li = $("#musicList li:first-child");
							$("#music").attr('src' , $li.attr('songUrl'));
							$(".music-singer").html($li.attr('singerName'));
							$(".music-name").html($li.html());
						}else{
							$("#music").attr('src' , $(this).next().attr('songUrl'));
							$(".music-singer").html($(this).next().attr('singerName'));
							$(".music-name").html($(this).next().html());
						}
						
					}
				})
			}else if(model == "随机播放"){
				var num = $("#musicList li").length;
				var random = Math.round(Math.random()*(num-1));
				var $li = $("#musicList li").eq(random);
				$("#music").attr('src' , $li.attr('songUrl'));
				$(".music-singer").html($li.attr('singerName'));
				$(".music-name").html($li.html());
			}else if(model == "单曲播放"){
				//什么都不需要做，直接当前歌曲直接播放
			}
			
			//随机播放
			//单曲循环
			$("#music")[0].play();
		}
		if(second/60>1){
			minute = Math.floor(second/60);
			// second = Math.floor(second%60);
			second = second%60;
		}
		if(minute<10){
			if(second<10){
				$(".start").html("0" + minute + ":" + "0" +second);
			}else{
				$(".start").html("0" + minute + ":" + second);
			}
		}else{
			if(second<10){
				$(".start").html(minute + ":" + "0" +second);
			}else{
				$(".start").html(minute + ":" + second);
			}
		}

		
	},
	musicTime : 0,
	showEndTime : function(){
		var audio = $("#music")[0];
		audio.onloadedmetadata  = function(){
			var time = Math.floor(audio.duration);
			major.musicTime = time;
			var minute = Math.floor(time/60);
			var second = time%60;
			if(minute<10){
				if(second<10){
					$(".end").html("0" + minute + ":" + "0" +second);
				}else{
					$(".end").html("0" + minute + ":" + second);
				}
			}else{
				if(second<10){
					$(".end").html(minute + ":" + "0" +second);
				}else{
					$(".end").html(minute + ":" + second);
				}
			}
		}
	},
	setPlayBar : function(){
		//上一曲
		$(".options-last").off('click').on('click' , function(){
			var model = $('.audio-model-set').html();
			if(model == "顺序播放" || model == "单曲循环"){
				var currentName = $("#music").attr('src'); //只能从audio里拿到src
				$("#musicList li").each(function(index , item){
					if($(this).attr('songUrl') == currentName){
						if(index>0){
							$("#music").attr('src' , $(this).prev().attr('songUrl'));
							$(".music-singer").html($(this).prev().attr('singerName'));
							$(".music-name").html($(this).prev().html());
						}else{
							$("#music").attr('src' , $("#musicList li:last-child").attr('songUrl'));
							$(".music-singer").html($("#musicList li:last-child").attr('singerName'));
							$(".music-name").html($("#musicList li:last-child").html());
						}
						
					}
				})
			}else if(model == "随机播放"){
				var num = $("#musicList li").length;
				var random = Math.round(Math.random()*(num-1));
				var $li = $("#musicList li").eq(random);
				$("#music").attr('src' , $li.attr('songUrl'));
				$(".music-singer").html($li.attr('singerName'));
				$(".music-name").html($li.html());
			}
			
			$("#music")[0].play();
		});
		//下一曲
		$(".options-next").off('click').on('click' , function(){
			var model = $('.audio-model-set').html();
			if(model == "顺序播放" || model == "单曲循环"){
				var currentName = $("#music").attr('src');
				$("#musicList li").each(function(index , item){
					if($(this).attr('songUrl') == currentName){
						if(index == $("#musicList li").length-1){
							$("#music").attr('src' , $("#musicList li:first-child").attr('songUrl'));
							$(".music-singer").html($("#musicList li:first-child").attr('singerName'));
							$(".music-name").html($("#musicList li:first-child").html());
						}else{
							$("#music").attr('src' , $(this).next().attr('songUrl'));
							$(".music-singer").html($(this).next().attr('singerName'));
							$(".music-name").html($(this).next().html());
						}
						
					}
				})
			}else if(model == "随机播放"){
				var num = $("#musicList li").length;
				var random = Math.round(Math.random()*(num-1));
				var $li = $("#musicList li").eq(random);
				$("#music").attr('src' , $li.attr('songUrl'));
				$(".music-singer").html($li.attr('singerName'));
				$(".music-name").html($li.html());
			}
			
			$("#music")[0].play();
		});
	},
	//随机播放
	//顺序播放
	//单曲循环
	
	favorite : function(){
		$(".label-heart").off('click').on('click' , function(){
			if($(this).attr('data-favorite') == 0){
				$(this).css('color' , 'red');
				$(this).attr('data-favorite' , '1')
			}else{
				$(this).css('color' , '#fff');
				$(this).attr('data-favorite' , '0');
			}
			
		})
	}
}
