jQuery(document).ready(function($) {
	
	$.fn.lunbotu=function(options){

		return this.each(function(){

			var lunbo=$('.roll');

			var items=$('.items');

			var over='mouseover';

			var out='mouseout';

			var click='click';

			var li='li';

			var cirPoint='.cirPoint';

			var ciron='cirOn';

			var cirOn='.cirOn';

			var cirLen=items.children(li).length;//这里是图片的数量,亦是圆点的数量

			var lunboTime=2000;//轮播时间

			var switchTime=400;//图片切换时间

			cir();

			btn();
    
        //根据图片数量生成圆点
			function cir(){

				lunbo.append('<ul class="cirPoint"></ul>');

				var cir_Point=$('.cirPoint');

				for(var i=0;i<cirLen;i++){

				cir_Point.append('<li style="" value="'+i+'"></li>');

				}

				var cirDss=cir_Point.width();

				cir_Point.css({

					left:'50%',

					marginLeft:-cirDss/2,

					bottom:'10%'

				});

				cir_Point.children(li).eq(0).addClass(ciron);

			}

		//生成左右按钮
		
			function btn(){

				var btn=$('.nav');

				var leftBtn=$('.nav:first-child');

				var rightBtn=$('.nav:nth-child(2)');

			//点击左面的按钮

				leftBtn.bind(click,function(){

					var cir_Point=$(cirPoint);

					var onLen=$(cirOn).val();

					items.children(li).eq(onLen).stop(false,false).animate({

						opacity:0

					},switchTime);
					
					if(onLen==0){

						onLen=cirLen;

					}

					items.children(li).eq(onLen-1).stop(false,false).animate({

						opacity:1

					},switchTime);

					cir_Point.children(li).eq(onLen-1).addClass(ciron).siblings().removeClass(ciron);
				
				});	

				//点击右面按钮
				
				rightBtn.bind(click,function(){

					var cir_Point=$(cirPoint);

					var onLen=$(cirOn).val();

					items.children(li).eq(onLen).stop(false,false).animate({

						opacity:0

					},switchTime);
					
					if(onLen==cirLen-1){//这里最后一个节点是cirLen-1

						onLen=-1;//这里第一个节点是-1

					}

					items.children(li).eq(onLen+1).stop(false,false).animate({

						opacity:1

					},switchTime);

					cir_Point.children(li).eq(onLen+1).addClass(ciron).siblings().removeClass(ciron);

				});
			}	

		//定时器

			int=setInterval(clock,lunboTime);

			function clock(){

				var cir_Point=$(cirPoint);

				var onLen=$(cirOn).val();

				items.children(li).eq(onLen).stop(false,false).animate({

					opacity:0
					
				},switchTime);

				if(onLen==cirLen-1){

					onLen=-1;

				}

				items.children(li).eq(onLen+1).stop(false,false).animate({

					opacity:1

				},switchTime);

				cir_Point.children(li).eq(onLen+1).addClass(ciron).siblings().removeClass(ciron);

			}

		//鼠标在图片上时，关闭定时器

			lunbo.bind(over,function(){

				clearTimeout(int);

			});

			lunbo.bind(out,function(){

				int=setInterval(clock,lunboTime);

			});

		//鼠标滑过圆点 切换图片

			$(cirPoint).children(li).bind(over,function(){

				var inde=$(this).index();

				$(this).addClass(ciron).siblings().removeClass(ciron);

				items.children(li).stop(false,false).animate({

					opacity:0

				},switchTime);

				items.children(li).eq(inde).stop(false, false).animate({

					opacity:1

				},switchTime);

			});

		});

	}

});

$(function(){

    $(".roll").lunbotu();

})