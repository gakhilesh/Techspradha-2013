		$(document).ready(function() {
			slideShow();
			animateHeading("home");
			$('#mainContent').scrollTo('#creditSection', 100);
			var hidden = false;
		$('a.panel').click(function(){
				var id = $(this).attr('id');				
				$(".left").fadeOut(300);
				//alert("hello")'
				$(".item h1").fadeOut(function(){
					$(".item h1").removeClass('titleAni');
				});

				$(".right").fadeOut(200);
				if(id=="home"){
					$(".goldenJublieeLogo").fadeOut(200);
					$("#facebookContainer").fadeIn(300);
					$("#newsFeed").fadeIn(300);	
				}
				else{
					$("#facebookContainer").fadeOut(300);
					$("#newsFeed").fadeOut(300);
					}
					$('a.panel').removeClass('selected');
					$(this).addClass('selected');
					current = $(this);
					$('#mainContent').scrollTo($(this).attr('href'), 800,function(){
					animateHeading(id);						
					});
			return false;
			});
			
			$(window).resize(function () {
				resizePanel();
			});
			
		
			$('#loginForm').submit(function(){
				alert("Invalid username/password!!");
				return false;
			});
		
		function animateHeading(id){
			$(".item h1").fadeIn(800,function(){
				$(".item h1").css('border-bottom','1px solid #000');
				$(".left").fadeIn(200,function(){
			
					if(id=='event'){
					$('#catagoDeveloper)ry li').each(function(){
//						var id = $(this).attr('id');
						
//						$(".item h1")).text(id).delay(400);
					});
				}	
			
				$(".right").fadeIn(600);
					if(id==='home'){
					$(".goldenJublieeLogo").fadeIn(1000);
					}
				});
			}).addClass('titleAni');
			
		}
		
		$('.cat-menu li').click(function(){
					$('.backdrop, .box').animate({'opacity':'.70'}, 300, 'linear');
					$('.box').animate({'opacity':'1.00'}, 300, 'linear');
					$('.backdrop, .box').css('display', 'block');
				});
 
				$('.close').click(function(){
					close_box();
				});
 
				$('.backdrop').click(function(){
					close_box();
				});
			
		});
		function close_box()
			{
				$('.backdrop, .box').animate({'opacity':'0'}, 300, 'linear', function(){
					$('.backdrop, .box').css('display', 'none');
				});
			}
			
		function resizePanel() {
		
			width = $(window).width();
			height = $(window).height();
		
			mask_height = height * $('.item').length;
				
			$('#debug').html(width  + ' ' + height + ' ' + mask_height);
			
			$('#mainContent, .item').css({width: width, height: height});
			$('#mask').css({width: width, height: mask_height});
			$('#mainContent').scrollTo($('a.selected').attr('href'), 0);
		}
		function slideShow(){
			var showing = $('#slideShow .current');
			var next = showing.next().length ? showing.next() : showing.parent().children(':first');
			showing.fadeOut(800, function() { next.fadeIn(1500).addClass('current'); }).removeClass('current');
			setTimeout(slideShow, 5000);
		}
		function getEffect(){
		$('.cat-menu li').each(function(idx) {
		//    $(this).delay( idx * 600 ).fadeIn( 600 );
		});

		}

