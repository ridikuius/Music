var init = {
	email : function(){
		$("#email").mailAutoComplete({
			boxClass: "out_box", //外部box样式
		    listClass: "list_box", //默认的列表样式
		    focusClass: "focus_box", //列表选样式中
		    markCalss: "mark_box", //高亮样式
		    autoClass: false,
		    textHint: true, //提示文字自动隐藏
		    // hintText: "email"
		});
	},
	judgePage : function(){
		var href = location.href();
	},
	logValide : function(){
		$("#login").off('click').on('click' , function(){
			var email = $("#email").val();
			var pass = $("#log-pass").val();
			var user = { 'email':email , 'password':pass};
			var msg = $('#msg');
			msg.hide();
			var regEmail = /\w+@\w+.com/;
			if(email.trim()==''){
				msg.html("邮箱不能为空").show();
			}else if(!regEmail.test(email)){
				msg.html('邮箱格式不正确').show();
			}else if(!pass.trim()){
				msg.html('密码不能为空').show();
			}else{
				$.ajax({
					type: "POST",
					url: "user/login",
					data : JSON.stringify(user),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						if(data.user=='false'){
							msg.html('邮箱或密码不正确').show();
						}else{
							if(data.user=='admin'){
								window.location = 'admin';
							}else{
								$.cookie('user',data.user);
								window.location = 'index';
							}
							
						}
					},
					error : function(){
						console.log('error');
					}
				})
			}
			// var url = 'http://127.0.0.1:8080/Music/login';
			/*$.post( url , {'user':user} , function( data , status){
				console.log(data)
				if(status=='error'){
					alert("fail")
				}else{
					location.href="././register.html"
				}
			})*/
			
		})
		
	},
	registerValide : function(){
		$("#register").off('click').on('click' , function(){
			$('.reg-name-valide , .reg-pass-valide , .reg-repass-valide , .reg-email-valide').hide();
			var regUser = $("#regUser").val();
			var regPass = $("#regPass").val();
			var regRePass = $("#regRepass").val();
			var email = $('#email').val();
			var regexEmail = /\w+@\w+.com/;
			var regexPass = /^[a-zA-Z]\w{5,19}$/;
			if(regUser.trim() == ''){
				$('.reg-name-valide').show('用户名不能为空');
			}else if(regPass.trim() == ''){
				$('.reg-pass-valide').html('密码不能为空').show();
			}else if(!regexPass.test(regPass)){
				$('.reg-pass-valide').html('密码以字母开头，只能包含数字字母，下划线，长度在6~20之间').show();
			}else if(regPass != regRePass){
				$('.reg-repass-valide').show();
			}else if(email.trim() == ''){
				$('.reg-email-valide').html('邮箱不能为空').show();
			}else if(!regexEmail.test(email)){
				$('.reg-email-valide').html('邮箱格式不正确').show();
			}else{
				var user = {'name':regUser ,'password':regPass ,'email':email};
				$.ajax({
					type: "post",
					url: "user/register",
					data : JSON.stringify(user),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(data){
						//如果注册成功
		          		if(data.i == '1'){
		          			window.location = 'login';
						//如果注册失败
		          		}else{
		          			alert('该用户已存在，可以直接登陆');
		          		}
		          	},
		          	error : function(XMLHttpRequest, textStatus, errorThrown){
		          		console.log(XMLHttpRequest.readyState);
						console.log(textStatus);
						console.log(errorThrown);
		          	}
	             
	        	});
			}
		})
	}
}
$(function(){
	init.email();
	init.logValide();
	init.registerValide();
	
})