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
	logValide : function(){
		$("#login").off('click').on('click' , function(){
			var email = $("#email").val();
			var pass = $("#log-pass").val();
			var user = { "email":email , "password":pass};
			//var user = '{"email":'+email+',"password:"'+pass+'}';
			console.log(user)
			var url = 'http://127.0.0.1:8080/Music/login';
			$.ajax({
				url:url,
				data:JSON.stringify(user),
				type:'post',
				contentType:'application/json',
				dataType:'json',
				success:function(msg){
					alert("11")
				}

			})

		})
		
	},
	registerValide : function(){

	}
}
$(function(){
	init.email();
	init.logValide();
})