$(function(){
	// admin.initAdminData();
	admin.initAdminMusicData();
	// admin.page();
	admin.quite();
	admin.clickSetInfo();
})
var admin = {
	initAdminMusicData : function(curr){
		var curr = curr || 1;
		$.ajax({
			type: "GET",
			url: "admin/songlist?page="+curr,
			// data: data,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(obj){
				var data = obj.pageInfo.list;
				$('.admin-ls').empty();
				var html = "";
				html += "<dt class='admin-ls-dt'>";
				html += "<ul class='admin-ls-dt-ls'>";
				html += "<li class='admin-title-number'>序号</li>";
				html += "<li class='admin-title-img'>图片</li>";
				html += "<li class='admin-title-song'>歌曲</li>";
				html += "<li class='admin-title-singer'>歌手</li>";
				html += "<li class='admin-title-download'>下载量</li>";
				html += "<li class='admin-title-play'>播放量</li>";
				html += "<li class='admin-title-collect'>收藏量</li>";
				html += "<li class='admin-title-buy'>购买量</li>";
				html += "<li class='admin-title-sou'>搜索量</li>";
				html += "<li class='admin-title-options'>操作</li>";
				html += "</ul></dt>";
				$.each(data , function(index , item){
					html += "<dd class='admin-ls-dd' songId='"+item.songId+"'>";
					html += "<ul class='admin-ls-dd-ls'>";
					html += "<li class='admin-number'>"+index+"</li>";
					html += "<li class='admin-img'><img src='"+item.imageUrl+"'></li>";
					html += "<li class='admin-song'>"+item.songName+"</li>";
					html += "<li class='admin-singer'>"+item.singerName+"</li>";
					html += "<li class='admin-download'>"+item.downloadCount+"</li>";
					html += "<li class='admin-play'>"+item.playCount+"</li>";
					html += "<li class='admin-collect'>"+item.collectCount+"</li>";
					html += "<li class='admin-buy'>"+item.songCost+"</li>";
					html += "<li class='admin-sou'>"+item.searchCount+"</li>";
					html += "<li class='admin-options'>";
					// html += "<a href='javascript:void(0);' class='admin-options-update'>修改</a>";
					html += "<a href='javascript:void(0);' class='admin-options-delete'>删除</a>";
					html += "</li></ul></dd>"		
				})
				$('.admin-ls').append(html);
				//分页
				laypage({
				    cont: $('#page'), //容器。值支持id名、原生dom对象，jquery对象,
				    pages: obj.pageInfo.pages, //总页数
				    skip: true, //是否开启跳页
				    skin: '#AF0000',
				    curr: curr || 1, //当前页
				    groups: 3 ,//连续显示分页数
				    jump: function(obj, first){ //触发分页后的回调
		                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
		                    admin.initAdminMusicData(obj.curr);
		                }
		            }
				});
				//删除操作
				admin.delete();
			},
			error : function(){
				console.log('error');
			}
		});
		
	},
	delete : function(){
		//删除音乐
		$('.admin-options-delete').each(function(index , item){
			$(this).off('click').on('click' , function(e){
				var id = $(this).closest('.admin-ls-dd').attr('songId');
				e.stopPropagation();
				$.ajax({
					type: "post",
					url: "admin/song/del",
					data : JSON.stringify({'id':id}),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						window.location = 'admin';
					},
					error : function(){

					}
				});
			})
		});

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
}