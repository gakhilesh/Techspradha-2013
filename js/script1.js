$(document).ready(function(){
		slideShow();
		animateHeading("home");
		$(".downLine").hide();
		$('#mainContent').scrollTo('#registerSection', 800);
		$('#sponsor').click(function(){
			$('#sponsorContentBoxMiddle').load('sponsor2012.html');
		});
		
		$('#sponsor2012Tab').click(function(){
			$('#sponsorContentBoxMiddle').load('sponsor2012.html');
			
		});
		var googlemaploaded = false;
		$('#contact').click(function(){
			if(googlemaploaded === false){
				$('#googleMapContent').load('googleMap.html',function(){
					googlemaploaded = true;
				});
			}
		});
		var registerLoaded = false;
		$('a#register').click(function(){
			if(registerLoaded === false){
				$('#registerContentBox').load('users/registrations',function(){
					registerLoaded = true;
				});
			}
		});
		
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
		$(".downLine").hide();
		$("#newsFeed").fadeIn(300,function(){
			
		});
		
	}
	else{
		$("#facebookContainer").fadeOut(300);
		$("#newsFeed").fadeOut(300);
		$(".downLine").show();
		}
		$('a.panel').removeClass('selected');
		$(this).addClass('selected');
		current = $(this);
		$('#mainContent').scrollTo($(this).attr('href'), 800,function(){
		animateHeading(id);						
		});
	return false;
});

$('.close').live("click",function(){
	close_box();
	return;
});
	
	
 
$('.backdrop').click(function(){
	close_box();
	return;
});

/*
$('#event').click(function(){
	$('.cat-menu li').each(function(idx) {
		$(this).delay( idx * 600 ).fadeIn( 600 );
	});

});
*/

$('#catagory li').click(function(){
	id = $(this).attr('name');
	loadCatagory(id);
	$('.backdrop, .box').animate({'opacity':'.70'}, 300, 'linear');
	$('.box').animate({'opacity':'1.00'}, 300, 'linear');
	$('.backdrop, .box').css('display', 'block');
	return;
});

    $('.tabs a').live("click",function(e) {
        e.preventDefault();
        if ($(this).closest("li").attr("for") == "current"){ //detection for current tab
         return       
        }
        else{       
        $(".content > div").hide(); //Hide all content
        $(".tabs >li").attr("for",""); //Reset id's
        $(this).parent().attr("for","current"); // Activate this
        $('#' + $(this).attr('name')).fadeIn(); // Show content for current tab
        }
    });

    $('.event-detail-tab a').live("click",function(e) {
        e.preventDefault();
        if ($(this).closest("li").attr("id") == "current1"){ 
		//detection for current tab
         return       
        }
        else{
		$(".event-detail-tab li").removeClass("event-tab-selected");
		$(this).parent().addClass("event-tab-selected");
		$(this+'::after').addClass("tabCursor");
        $(".event-content > div").hide(); //Hide all content
        $(".event-detail-tab >li").attr("id",""); //Reset id's
        $(this).parent().attr("id","current1"); // Activate this
        $('#' + $(this).attr('name')).fadeIn(); // Show content for current tab
        }
    });

//showBox("cat_main_tab10","tab28");

}); //end of document.ready
var eventsLoaded = false;

function loadCatagory(id){
		/*
		if(eventsLoaded == false){
			$.getJSON('simple.json',function(data){
				data1 = data;
				//alert(eventsLoaded);
				eventsLoaded = true;
				//displayEvents(data1,id);
			});
		}
		*/
		//displayCategory(id);
		if(eventsLoaded == false){
			$(".box").load("users/service/catWiseInfo/",function(){
				eventsLoaded = true;
				displayCategory(id);
			});
		
		}
		else{
			displayCategory(id);
		}

}
function displayCategory(catid){
	$(".box >div").hide();
	$("#"+catid).fadeIn(200);
	$(".content >div").hide(); // Initially hide all content
    $(".tabs >li:first").attr("for","current"); // Activate first tab
    $(".content > div:first").fadeIn(); // Show first tab content
	
	$(".event-content >div").hide(); // Initially hide all content
    $(".event-detail-tab >li:first").attr("id","current1").addClass("event-tab-selected"); // Activate first tab
    $(".event-content div:first").fadeIn(); // Show first tab content
}

function showBox(catid,eventid){
$('.backdrop, .box').animate({'opacity':'.70'}, 300, 'linear');
	$('.box').animate({'opacity':'1.00'}, 300, 'linear');
	$('.backdrop, .box').css('display', 'block');
	loadCatagory(catid);
	loadEvent(eventid);
}

function loadEvent(eventid){
	$('#' +eventid).fadeIn(); // Show content for current tab
}	

function tick(){
		$('#ticker li:first').slideUp( function () { $(this).appendTo($('#ticker')).slideDown(); });
	}
	setInterval(function(){ tick () }, 3000);	
function animateHeading(id){

$(".item h1").fadeIn(800,function(){
	$(".item h1").css('border-bottom','1px solid #000');
	$(".left").fadeIn(200,function(){
	$(".right").fadeIn(600);
		if(id==='home'){
		$(".goldenJublieeLogo").fadeIn(1000);
		}
	});
	}).addClass('titleAni');

}
$(window).resize(function () {
				resizePanel();
			});
			
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


function close_box()
{
	$('.backdrop, .box').animate({'opacity':'0'}, 300, 'linear', function(){
		$('.backdrop, .box').css('display', 'none');
	});
}