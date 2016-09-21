$(function(){
	adminUser.initAdminUserData();
	adminUser.quite();
	adminUser.clickSetInfo();
})
var adminUser = {
	initAdminUserData : function(curr){
		var curr = curr || 1;
		$.ajax({
			type: "GET",
			url: "admin/user?page="+curr,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(obj){
				var data = obj.pageInfo.list;
				$('#adminUser').empty();
				var html = "";
				html += "<dt class='admin-ls-dt'>";
				html += "<ul class='admin-ls-dt-ls'>";
				html += "<li class='admin-title-number'>序号</li>";
				html += "<li class='admin-title-img'>logo</li>";
				html += "<li class='admin-title-song'>用户名称</li>";
				html += "<li class='admin-title-singer'>联系电话</li>";
				html += "<li class='admin-title-download'>账户余额</li>";
				html += "<li class='admin-title-play'>邮箱</li>";
				html += "<li class='admin-title-collect'>下载量</li>";
				html += "<li class='admin-title-buy'>好友量</li>";
				html += "<li class='admin-title-sou'>粉丝量</li>";
				html += "<li class='admin-title-options'>操作</li>";
				html += "</ul>";
				html += "</dt>";
				$.each(data , function(index , item){
					html += "<dd class='admin-ls-dd' userId = '"+item.id+"'>";
					html += "<ul class='admin-ls-dd-ls'>";
					html += "<li class='admin-number'>"+index+"</li>";
					html += "<li class='admin-img'><img src='"+item.portrait+"'></li>";
					html += "<li class='admin-song'>"+item.name+"</li>";
					html += "<li class='admin-singer'>"+item.phone+"</li>";
					html += "<li class='admin-download'>"+item.asset+"</li>";
					html += "<li class='admin-play'>"+item.email+"</li>";
					html += "<li class='admin-collect'>"+item.downloadCount+"</li>"; //下载量
					html += "<li class='admin-buy'>"+item.friendCount+"</li>";  //好友量
					html += "<li class='admin-sou'>"+item.fansCount+"</li>"; //粉丝量
					html += "<li class='admin-options'>";
					// html += "<a href='javascript:void(0);' class='admin-options-update'>修改</a>";
					html += "<a href='javascript:void(0);' class='admin-options-delete'>删除</a>";
					html += "</li></ul></dd>"		
				})
				$('#adminUser').append(html);
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
		                    adminUser.initAdminUserData(obj.curr);
		                }
		            }
				});
				//删除用户
				adminUser.deleteUser();
			},
			error : function(){
				console.log('error');
			}
		});
		
	},
	deleteUser : function(){
		$('.admin-options-delete').each(function(index , item){
			$(this).off('click').on('click' , function(){
				var id = $(this).parent().parent().parent().attr('userId');
				var data = { 'id':id}
				$.ajax({
					type: "post",
					url: "admin/user/delete",
					data : JSON.stringify(data),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(obj){
						window.location = 'adminUser';
					},
					error : function(){
						console.log('error')
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