$(function(){
	// setInterval(animate.goLeft , 5000);
	animate.goLeft();
	animate.arrowClick();
})
var animate = {
	go : 1,
	back : 5,
	goLeft : function(){
		var $ul = $(".banner-box-ls");
		var $lis = $('.banner-box-ls').children('li');
		var width = $lis.eq(0).width();
		setInterval(function(){
			animate.animateLeftFunction($ul , width);
		},10000)
	},
	animateLeftFunction : function($ul , width){
		$ul.animate({'margin-left': '-' + width + 'px'}, 'slow', function() {
			$ul.css({'margin-left': 0}).children('li').last().after($ul.children('li').first())
		});
	},
	animateRightFunction : function($ul , width){
		$ul.animate({'margin-left':  width + 'px'}, 'slow', function() {
			$ul.css({'margin-left': 0}).children('li').first().before($ul.children('li').last())
		});
	},
	arrowClick : function(){
		var $ul = $(".banner-box-ls");
		var $lis = $('.banner-box-ls').children('li');
		var width = $lis.eq(0).width();
		$("#indexArrowLeft").off('click').on("click" , function(){
			animate.animateLeftFunction($ul , width);
		})
		$("#indexArrowRight").off('click').on("click" , function(){
			animate.animateRightFunction($ul , width);
		})
	}
}