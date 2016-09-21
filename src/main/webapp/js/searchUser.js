$(function(){
	search.initData();
	search.searchUser();
})
var search = {
	initData : function(curr){
		var curr = curr || 1 ;
		$.ajax({
			type : 'POST',
			url : 'user/userList?page='+curr,
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			success : function(data){
				var objs = data.pageInfo.list;
				var html = "";
				$('.user-list').empty();
				$.each(objs , function(index , item){
					html += "<li userid='"+item.id+"'>";
					html += "<div class='user-list-info'>"
					html += "<span class='search-user-name'>"+item.name+"</span>";
					html += "<p class='search-friend-num'>";
					html += "<i>"+item.fansCount+"</i>粉丝 ";
					html += "<i>"+item.friendCount+"</i>好友";
					html += "</p></div>";
					html += "<img src='"+item.portrait+"'>";
					html += "</li>";
				});
				$('.user-list').append(html);
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
		                    search.initData(obj.curr);
		                }
		            }
				});
				//整条可点
				search.clickAll();
			},
			error : function(){

			}
		});
	},
	//跳转到个人中心页
	clickAll : function(){
		$('.user-list li').each(function(index , item){
			$(this).off('click').on('click' , function(){
				var currentUserId = $(this).attr('userid');
				$.cookie('currentUserId' , currentUserId);
				window.location = 'personal';
			})
		})
	},
	searchUser : function(){
		//提示文字消失于回复
		$('#userInput , .list-tishi').off('click').on('click' , function(e){
			$('.list-tishi').hide();
			e.stopPropagation();
		});
		$(document).off('click').on('click' , function(){
			var key = $('#userInput').val();
			if($.trim(key) == ''){
				$('.list-tishi').show();
			}
		});
		//回车搜索
		$('#userInput').keydown(function(event){
			if(event.keyCode == 13){
            	var key = $('#userInput').val();
            	if(!key){
            		alert("输入值为空");
            		return false;
            	}
				search.searchUserByKey(key);
        	}
		});
		//按钮搜索
		$('#searchUser').off('click').on('click' , function(){
			var key = $('#userInput').val();
			if(!key){
        		alert("输入值为空");
        		return false;
        	}
			search.searchUserByKey(key);
		})
	},
	//通过搜索词搜索
	searchUserByKey : function(key , curr){
		var curr = curr || 1 ;
		$.ajax({
			type : 'POST',
			url : 'user/select/name?page='+curr,
			data : JSON.stringify({'name':key}),
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
			success : function(data){
				var objs = data.list.list;
				var html = "";
				$('.user-list').empty();
				$.each(objs , function(index , item){
					html += "<li userid='"+item.id+"'>";
					html += "<div class='user-list-info'>"
					html += "<span class='search-user-name'>"+item.name+"</span>";
					html += "<p class='search-friend-num'>";
					html += "<i>"+item.fansCount+"</i>粉丝 ";
					html += "<i>"+item.friendCount+"</i>好友";
					html += "</p></div>";
					html += "<img src='"+item.portrait+"'>";
					html += "</li>";
				});
				$('.user-list').append(html);
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
							var key = $('#userInput').val();
		                    search.searchUserByKey(key , obj.curr);
		                }
		            }
				});
				//整条可点
				search.clickAll();
			},
			error : function(){

			}
		});
	}
	
}
