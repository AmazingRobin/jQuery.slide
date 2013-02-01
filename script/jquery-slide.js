/*
 *jQuery 图片轮翻(焦点图)插件
 *Version：1.1.0201
 *Author：Robin
 *Date：2013-01-10
 *EDIT.Robin.201302012319
 *Demo：http://www.lisibin.org/demo/slide/
 *copyright:理论上可以免费使用，但请保留开发者信息。
 */
 (function($){
 	$.fn.slide = function(options){
 		var defaults = {
 			direction : "left",	//滚动方向 left || top
 			duration : 300,	//滚动时间 
 			easing : "linear", // 过度效果 linear || swing
 			delay : 4000, //滚动延迟
 			arraw : true, //箭头
 			title : true, //标题栏
 			btn : true, //按钮
 			trigger : "mouseenter" //触发事件 click || mouseenter
 		}
 		var options = $.extend(defaults, options);
 		//计算相关数据
 		var wrap = $(this), ul = wrap.find('ul'), lis = ul.find('li'), len = lis.length, bWidth = wrap.width(), bHeight = wrap.height(), liHeight = lis.first().height(), title = "", btn = '', arraw = '', index = 0, direc = '', offset = '', timer = '', prveAllow = true, nextAllow = true;
 		//标题栏
 		if (options.title) {
 			var btnBg = "<div id='btn-bg'></div>";
 			wrap.append(btnBg);
 		};
 		
 		if(options.direction == "left"){
 			ul.width( bWidth * len );
 			ul.height( bHeight );
 		}else{
 			ul.width( bWidth );
 			ul.height( bHeight * len );
 		}
 		//箭头
 		if (options.arraw){
 			arraw = "<a id='prev'></a><a id='next'></a>";
 			wrap.append(arraw);
 			wrap.find('#prev').click(function(){
 				if(prveAllow){
 					prveAllow = false;
	 				pause();
	 				index--;
	 				if (index == -1) {
	 					lis.last().css({"position":"relative", "left": -bWidth * len});
	 					wrap.find('#btn span').eq(len-1).addClass('current').siblings().removeClass('current');
	 					ul.animate({"left": bWidth+"px"},options.duration,function(){
							lis.last().css({"position":"static", "left": 0});
							ul.css("left", -bWidth*(len-1));
							prveAllow = true;
	 					})
	 				}else if (index == -2) {
	 					index = 2;
	 					showPic(index);
	 				}else{
	 					showPic(index);
	 				}
 				}
 			})
 			wrap.find('#next').click(function(){
 				if (nextAllow) {
 					nextAllow = false;
 					pause();
	 				index++;
	 				if (index == len + 1) { index = 1};
	 				showPic(index);
 				}
 			})
 		}
 		//按钮
 		if (options.btn) {
 			btn = "<div id='btn'>";
 			for( var i = 0; i < len; i++){
 				btn += "<span>"+(i+1)+"</span>";
 			}
 			btn += "</div>";
 			wrap.append(btn);
 			wrap.find('#btn span').bind(options.trigger, function(){
 				index = $(this).index();
 				showPic(index);
 			}).eq(0).trigger(options.trigger)
 		}else{
 			wrap.find('#btn-bg').text( lis.eq(0).find('img').attr('alt'));
 		}
 		//自动滚动
 		wrap.hover(function(){
 			pause();
 		},function(){
 			start();
 		}).trigger('mouseleave')
 		//
 		function pause(){clearInterval(timer); }
 		function start(){
 			timer = setInterval(function(){
 				index++;
 				if (index == len + 1) { index = 1};
 				showPic(index);
 			},options.delay)
 		}
 		 //执行函数
 		function showPic(index){
 			if(options.direction == "left"){
 				offset = bWidth * index * -1;
 				direc = { "left" : offset+"px"};
 			}else{
 				offset = bHeight * index * -1;
 				direc = { "top" : offset+"px"};
 			}
 			if(options.title){
 				if(index == len){ 
 					wrap.find('#btn-bg').text( lis.eq(0).find('img').attr('alt'));
 				}
 				wrap.find('#btn-bg').text( lis.eq(index).find('img').attr('alt'));
 			}
 			if (index == len) {
 				if(options.direction == "left"){
					lis.first().css({"position":"relative", "left": bWidth * len});
						wrap.find('#btn span').eq(0).addClass('current').siblings().removeClass('current');
						ul.animate({"left": -1 * bWidth * len+"px"},options.duration,function(){
							lis.first().css({"position":"static", "left": 0});
							ul.css("left", 0);
							prveAllow = true;
							nextAllow = true;
					});
				}else{
					lis.first().css({"position":"relative", "top": bHeight * len});
						wrap.find('#btn span').eq(0).addClass('current').siblings().removeClass('current');
						ul.animate({"top": -1 * bHeight * len+"px"},options.duration,function(){
							lis.first().css({"position":"static", "top": 0});
							ul.css("top", 0);
							prveAllow = true;
							nextAllow = true;
					});
				}
			}else{
				wrap.find('#btn span').eq(index).addClass('current').siblings().removeClass('current');
 				wrap.find(ul).stop(true,false).animate( direc, options.duration, options.easing, function(){
	 			prveAllow = true;
	 			nextAllow = true;
 			});
			}
 		}
 	}
})(jQuery)