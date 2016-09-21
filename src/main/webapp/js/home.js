$(function(){
	index.initBanner();
	index.initNav();
	index.initHot();
	index.hotHover();
	// index.banner();
	index.initIike();
	index.initNew();
	index.morePlay();
	index.moreDownload();
	// index.jump();
})
var index = {
	initBanner : function(){
		$('.banner-box-ls li').each(function(index , item){
			$(this).off('click').on('click' , function(){
				var song = $(this).attr("songName");
				var songId = $(this).attr('songId');
				var songUrl = $(this).attr('songUrl');
				var singer = $(this).attr('singerName');
				var songType = $(this).attr('songType');
				var songTime = $(this).attr('songTime');
				var songCost = $(this).attr('songCost');
				var songObj = 'song='+song+'&songId='+songId+'&songUrl='+songUrl+'&singer='+singer+'&songType='+songType+'&songTime='+songTime+'&songCost='+songCost;
				// var songObj = {'song':song , 'songUrl':songUrl , 'songId':songId , 'singer':singer , 'img':img}
				/*songObj.song = song;
				 songObj.songId = songId;
				 songObj.songUrl = songUrl;
				 songObj.img = img;*/
				$.cookie('songObj',songObj);
				window.location = 'show';
			})
		})
	},
	initNav : function(){
		$.ajax({
			type: "GET",
			url: "songType",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				var obj = data.songTypeList;
				$('.index-hot-nav').empty();   
				var html = '';
				html += "<dt class='index-hot-dl'><h1 class='index-h1'>热门推荐</h1></dt>"
				$.each(obj , function(index , item){
					html += "<dd><a href='javascript:void(0);' type='"+item.id+"'>"+item.name+"</a></dd>";
				})
				$(".index-hot-nav").append(html);

				//默认第一个为选中状态
				$(".index-hot-nav dd").eq(0).addClass('active');
				//导航点击事件
				$('.index-hot-nav dd').each(function(i , item){
					$(this).off('click').on('click' , function(){
						var key = $(this).find('a').html();
						index.typeClick(key);
						$('.index-hot-nav dd').each(function(index , item){
							$(this).removeClass('active');
						})
						$(this).addClass('active');
					})
				})
			}
		});
		
	},
	initHot : function(type){
		if(!type){
			var type = 1
		}
		var data = {'type':type}
		$.ajax({
			type: "GET",
			url: "list",
			data: data,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				$(".index-hot-con").empty();
				var obj = data.pageInfo.list;
				console.log(obj);
				var html = '';
				$.each(obj , function(index , item){
					html += "<li songId='"+item.songId+"' songUrl='"+item.songUrl+"' songType='"+item.songType+"' songTime='"+item.timeLength+"' songCost='"+item.songCost+"' ><a href='javascript:void(0);'>";
					html += "<img src='"+item.imageUrl+"' ></a>";
					html += "<p class='index-hot-con-mc'>";
					html += "<span>"+item.songName+"</span>";
					html += "<span> - </span>";
					html += "<span>"+ item.singerName+"</span>";
					html += "</p></li>";
				})
				$(".index-hot-con").append(html);

				$('.index-hot-con li').each(function(index , item){
					$(this).off('click').on('click' , function(){
						var song = $(this).find('span').eq(0).html();
						var songId = $(this).attr('songId');
						var songUrl = $(this).attr('songUrl');
						var singer = $(this).find('span').eq(2).html();
						var songType = $(this).attr('songType');
						var songTime = $(this).attr('songTime');
						var songCost = $(this).attr('songCost');
						var songObj = 'song='+song+'&songId='+songId+'&songUrl='+songUrl+'&singer='+singer+'&songType='+songType+'&songTime='+songTime+'&songCost='+songCost;
						// var songObj = {'song':song , 'songUrl':songUrl , 'songId':songId , 'singer':singer , 'img':img}
						/*songObj.song = song;
						songObj.songId = songId;
						songObj.songUrl = songUrl;
 						songObj.img = img;*/
						$.cookie('songObj',songObj);
						window.location = 'show';
					})
				})
			}
		});

		
	},
	initIike : function(){
		$.ajax({
			type: "GET",
			url: "list?sort=searchCount",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				$('.index-like-con').empty();
				var obj = data.pageInfo.list;
				var html = "";
				$.each(obj , function(index , item){
					html += "<li songId='"+item.songId+"' songName='"+item.songName+"' songUrl='"+item.songUrl+"' singerName='"+item.singerName+"' songType='"+item.songType+"' songTime='"+item.timeLength+"'  songCost='"+item.songCost+"' ><a href='javascript:void(0);'>";
					html += "<img src='"+item.imageUrl+"'>";
					html += "</a></li>";
				});
				$('.index-like-con').append(html);

				$('.index-like-con li').each(function(index , item){
					$(this).off('click').on('click' , function(){
						var song = $(this).attr('songName');
						var songId = $(this).attr('songId');
						var songUrl = $(this).attr('songUrl');
						var singer = $(this).attr('singerName');
						var songType = $(this).attr('songType');
						var songTime = $(this).attr('songTime');
						var songCost = $(this).attr('songCost');
						var songObj = 'song='+song+'&songId='+songId+'&songUrl='+songUrl+'&singer='+singer+'&songType='+songType+'&songTime='+songTime+'&songCost='+songCost;
						
						// index.jump(songId);
						// var songObj = {'song':song , 'songUrl':songUrl , 'songId':songId , 'singer':singer , 'img':img}
						/*var songObj;
						songObj.song = song;
						songObj.songId = songId;
						songObj.songUrl = songUrl;
						songObj.singer = singer;
						songObj.img = img;*/
						$.cookie('songObj',songObj);
						window.location = 'show';
					})
				})
			}
		});

		
	},
	initNew : function(){
		$.ajax({
			type: "GET",
			url: "list",
			//data: data,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				$('.index-new-con').empty();
				var obj = data.pageInfo.list;
				var html = "";
				$.each(obj , function(index , item){
					html += "<li songId='"+item.songId+"' songName='"+item.songName+"' singerName='"+item.singerName+"' songUrl='"+item.songUrl+"' songType='"+item.songType+"' songTime='"+item.timeLength+"' songCost='"+item.songCost+"'><a href='javascript:void(0);'>";
					html += "<img src='"+item.imageUrl+"'>";
					html += "</a></li>";
				});
				$('.index-new-con').append(html);

				$('.index-new-con li').each(function(index , item){
					$(this).off('click').on('click' , function(){
						var song = $(this).attr('songName');
						var songId = $(this).attr('songId');
						var songUrl = $(this).attr('songUrl');
						var singer = $(this).attr('singerName');
						var songType = $(this).attr('songType');
						var songTime = $(this).attr('songTime');
						var songCost = $(this).attr('songCost');
						var songObj = 'song='+song+'&songId='+songId+'&songUrl='+songUrl+'&singer='+singer+'&songType='+songType+'&songTime='+songTime+'&songCost='+songCost;

						
						// var songObj = {'song':song , 'songUrl':songUrl , 'songId':songId , 'singer':singer , 'img':img}
						
						/*var songObj;
						songObj.song = song;
						songObj.songId = songId;
						songObj.songUrl = songUrl;
						songObj.singer = singer;
						songObj.img = img;*/
						$.cookie('songObj',songObj);
						window.location = 'show';
					})
				})
			}
		});

	},
	hotHover : function(){
		$('.index-hot-con li').each(function(index , item){
			$(this).off('mouseover').on('mouseover' , function(){
				$(this).find(".index-hot-con-mc").show();
			});
		});
		$('.index-hot-con li').each(function(index , item){
			$(this).off('mouseout').on('mouseout' , function(){
				$(this).find(".index-hot-con-mc").hide();
			});
		});
	},
	morePlay : function(){
		$.ajax({
			type: "GET",
			url: "list?sort=playCount",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				var obj = data.pageInfo.list;
				var html = "";
				$('.index-more-play-con').empty();
				$.each(obj , function(index , item){
					html += "<li songId='"+item.songId+"' songUrl='"+item.songUrl+"' songType='"+item.songType+"' songTime='"+item.timeLength+"' songCost='"+item.songCost+"'>";
					html += "<a href='javascript:void(0);'>";
					html += "<span class='index-more-play-song' >"+item.songName+"</span>";
					html += "-";
					html += "<span class='index-more-play-singer'>"+item.singerName+"</span>";
					html += "</a></li>";
					if(index == 9){
						return false;
					}
				});
				$('.index-more-play-con').append(html);

				$(".index-more-play-con li").each(function(){
					$(this).off('click').on('click' , function(){
						var song = $(this).find('.index-more-play-song').html();
						var songId = $(this).attr('songId');
						var songUrl = $(this).attr('songUrl');
						var singer = $(this).find('.index-more-play-singer').html();
						var songType = $(this).attr('songType');
						var songTime = $(this).attr('songTime');
						var songCost = $(this).attr('songCost')
						var songObj = 'song='+song+'&songId='+songId+'&songUrl='+songUrl+'&singer='+singer+'&songType='+songType+'&songTime='+songTime+'&songCost='+songCost;

						$.cookie('songObj',songObj);
						window.location = 'show';
						// index.jump(songId);
					})
				})
			}
		});
		
	},
	moreDownload : function(){
		$.ajax({
			type: "GET",
			url: "list?sort=downloadCount",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				var obj = data.pageInfo.list;
				var html = "";
				$('#index-more-download').empty();
				$.each(obj , function(index , item){
					html += "<li songId='"+item.songId+"' songUrl='"+item.songUrl+"' songType='"+item.songType+"' songTime='"+item.timeLength+"' songCost='"+item.songCost+"'>";
					html += "<a href='javascript:void(0);'>";
					html += "<span class='index-more-download-song' >"+item.songName+"</span>";
					html += "-";
					html += "<span class='index-more-download-singer'>"+item.singerName+"</span>";
					html += "</a></li>";
					if(index == 9){
						return false;
					}
				});
				$('#index-more-download').append(html);

				$("#index-more-download li").each(function(){
					$(this).off('click').on('click' , function(){
						var song = $(this).find('.index-more-download-song').html();
						var songId = $(this).attr('songId');
						var songUrl = $(this).attr('songUrl');
						var singer = $(this).find('.index-more-download-singer').html();
						var songType = $(this).attr('songType');
						var songTime = $(this).attr('songTime');
						var songCost = $(this).attr('songCost')
						var songObj = 'song='+song+'&songId='+songId+'&songUrl='+songUrl+'&singer='+singer+'&songType='+songType+'&songTime='+songTime+'&songCost='+songCost;

						// var songObj = {'song':song , 'songUrl':songUrl , 'songId':songId , 'singer':singer };
						
						/*var songObj;
						songObj.song = song;
						songObj.songId = songId;
						songObj.songUrl = songUrl;
						songObj.singer = singer;
						songObj.img = img;*/
						$.cookie('songObj',songObj);
						window.location = 'show';
						// index.jump(songId);

					})
				})
			}
		});
		
	},
	typeClick : function(key){
		if(!key){
			return false;
		}
		$.ajax({
			type: "GET",
			url: "type/select?search="+key,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(data){
				$(".index-hot-con").empty();
				var obj = data.pageInfo.list;
				console.log(obj);
				var html = '';
				$.each(obj , function(index , item){
					html += "<li songId='"+item.songId+"' songUrl='"+item.songUrl+"' songType='"+item.songType+"' songTime='"+item.timeLength+"' songCost='"+item.songCost+"' ><a href='javascript:void(0);'>";
					html += "<img src='"+item.imageUrl+"' ></a>";
					html += "<p class='index-hot-con-mc'>";
					html += "<span>"+item.songName+"</span>";
					html += "<span> - </span>";
					html += "<span>"+ item.singerName+"</span>";
					html += "</p></li>";
				})
				$(".index-hot-con").append(html);

				$('.index-hot-con li').each(function(index , item){
					$(this).off('click').on('click' , function(){
						var song = $(this).find('span').eq(0).html();
						var songId = $(this).attr('songId');
						var songUrl = $(this).attr('songUrl');
						var singer = $(this).find('span').eq(2).html();
						var songType = $(this).attr('songType');
						var songTime = $(this).attr('songTime');
						var songCost = $(this).attr('songCost');
						var songObj = 'song='+song+'&songId='+songId+'&songUrl='+songUrl+'&singer='+singer+'&songType='+songType+'&songTime='+songTime+'&songCost='+songCost;
						// var songObj = {'song':song , 'songUrl':songUrl , 'songId':songId , 'singer':singer , 'img':img}
						/*songObj.song = song;
						songObj.songId = songId;
						songObj.songUrl = songUrl;
 						songObj.img = img;*/
						$.cookie('songObj',songObj);
						window.location = 'show';
					})
				})
			}
		});
	}
}