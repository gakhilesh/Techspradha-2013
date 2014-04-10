$(document).ready(function(){
		slideShow();
		animateHeading("home");
		$('#mainContent').scrollTo('#homeSection', 800);
		$(".marqueeContainer").hide();	
		$('.downLine').marquee().mouseover(function () {
		  $(this).trigger('stop');
			}).mouseout(function () {
		  $(this).trigger('start');
		});
		//showBox("cat_main_tab10","tab28");
		var sponsorloaded =false;
		$('#sponsor').click(function(){
			if(sponsorloaded ===false){
				$('#sponsorContentBoxMiddle').load('sponsor2013.html');
			}
		});
		
		$('.sponsorTabContent li>a').click(function(){
			var id = $(this).attr('name');
			$('#sponsorContentBoxMiddle').load('sponsor'+id+'.html');
			
		});
		
		var registerLoaded = false;
		$('a#register').click(function(){
			if(registerLoaded === false){
				$('#registerContentBox').load('users/registrations/',function(){
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
		$(".marqueeContainer").hide();
		$("#newsFeed").fadeIn(300,function(){
			
		});
		
	}
	else{
		$("#facebookContainer").fadeOut(300);
		$("#newsFeed").fadeOut(300);
		$(".marqueeContainer").show();
		$(".goldenJublieeLogo").fadeOut(200);
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

	$('#catagory li').click(function(){
		id = $(this).attr('name');
		showBox();
		$("#feedbackBox").hide();
		$("#newsfeedBox").hide();
		$('#loading').show();
		$("#eventBox").show();
		$('#workshopBox').hide();
		loadCatagory(id);
		return;
	});

	$("#workshop-menu li").live("click",function(){
		id = $(this).attr('name');
		showBox();
		$("#feedbackBox").hide();
		$("#newsfeedBox").hide();
		$('#loading').show();
		$("#eventBox").hide();
		$('#workshopBox').show();
		loadWorkshop(id);
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
			$('#' + $(this).attr('name')).fadeIn(function(){
				var evntid = $(this).attr('name');
				$('#event_description'+evntid).css('display','block');
			}); // Show content for current tab	
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
			$(".event-detail-tab li a").css('color','#000');
			$(this+'::after').addClass("tabCursor");
			$(".event-content > div").hide(); //Hide all content
			$(".event-detail-tab >li").attr("id",""); //Reset id's
			$(this).parent().attr("id","current1"); // Activate this
			$('#' + $(this).attr('name')).fadeIn(); // Show content for current tab
        }
    });
	
	var googlemaploaded = false;
	$("a#feedbackLink").click(function(){
		showBox();
		$('#eventBox').hide();
		$('#newsfeedBox').hide();
		$('#workshopBox').hide();
		$('#feedbackBox').show();
		if(googlemaploaded === false){
			$('#googleMapContent').load('googleMap.html',function(){
				googlemaploaded = true;
			});
		}
	});
	
	var wkshop = false;
	$("a#registerLink").click(function(){	
		$.getJSON('/users/service/events_list?mode=json',function(data){
			var eventlist = [];
			$.each(data, function(key,value){
				eventlist.push('<option name="event-selected[]" value="'+value["evnt_id"]+'">'+value["evnt_name"]+'</option>');
			});
			$("#event-selected").html(eventlist.join(''));
		});
		
		$.getJSON('/users/service/workshops_list',function(data){
			var workshoplist = [];
			$.each(data, function(key,value){
				workshoplist.push('<option name="workshop-selected[]" value="'+value["wshop_id"]+'">'+value["wshop_title"]+'</option>');
			});
			$("#workshop-selected").html(workshoplist.join(''));
		});
	
	});
	
	$("#workshop").click(function(){
		$.getJSON('/users/service/workshops_list',function(data){
			var workshoplist = [];
			$.each(data, function(key,value){
				workshoplist.push('<li name="workshop_'+value["wshop_id"]+'"><div class="cat-content"><h2 class="cat-main">'+value["wshop_title"]+'</h2><span class="cat-icon"></span><h3 class="cat-sub"></h3></div></li>');
			});
			$("#workshop-menu").html(workshoplist.join(''));
		});
	});

	$("#feedbackForm").submit(function(e){
		e.preventDefault();
		$("#feedbackForm input[type=submit]").val("Sending..").attr("disabled", true);
		$.post('/users/admin/feedback/add',$("#feedbackForm").serialize(), function(data) {
			if(data.error===0){
				$("#feedbackForm").html("<h2>Thank you for your feedback<h2>").addClass('thankyou');
			}
			else{
				$("#feedbackForm").html("<h2>OOPS!! Some Error occured<h2>").addClass('error');
			}
		},'json');
		return false;
	});

	$("#registerNew").live("click",function(e){
		$(".registerLeftBox").show();
		$(".registerRightBox").show();
		$("#registrationForm input[type=submit]").val("Register").attr("disabled", false);
		$("#registrationForm input[type!=submit]&&[type!=reset]").val('');
		$(".regAgain").remove();
	});

	$("#registrationForm").submit(function(e){
		e.preventDefault();
		$("#registrationForm input[type=submit]").val("Registering..").attr("disabled", true);
		$.post('/users/registrations/register',$("#registrationForm").serialize(), function(data) {
			if(data.error===0){
				$(".registerLeftBox").hide();
				$(".registerRightBox").hide();
				$("#registrationForm").append("<span class='regAgain thankyou'><h2>You have been Successfully registered for the event.<h2></span>");
				$("#registrationForm").append("<span class='regAgain'><br><a id='registerNew' href='#'>Register new event</a></span>");
			}
			else{
				$("#registrationForm").append("<span class='regAgain error'><h2>OOPS!!! Error Occured.<h2></span>");
				$("#registrationForm").append("<span class='regAgain error'><br><a id='registerNew'>Register again</a></span>");
			}
		},'json');
		return false;
	});

	var newsData = null;
	$.getJSON('/users/service/newsfeeds?mode=json',function(data){
		var newslist = [];
		var newstop = [];
		newsData = data;
		$.each(data, function(key,value){
			newslist.push('<li newsid="'+value["feed_id"]+'">'+value["feed_title"]+'<span class="newsSeperator">&nbsp;&nbsp;|&nbsp;&nbsp;</span></li>');
			newstop.push('<li newsid="'+value["feed_id"]+'">'+value["feed_title"]+'</li>');
		});
		loadCatagory("cat_main_tab9");
		$("#marqueeNews").html(newslist.join(''));
		$("#ticker").html(newstop.join(''));
		$("#feedpopup").html(newstop.join(''));
	});

	$(".tickernews li").live("click",function(){
		showBox();
		$('#eventBox').hide();
		$('#newsfeedBox').show();
		$('#feedbackBox').hide();
		$('#workshopBox').hide();
		var id = $(this).attr('newsid');
		$.each(newsData, function(key,value){
			if(value["feed_id"] === id){
				$("#messageTitle").html(value["feed_title"]);
				$("#messageDesc").html(value["feed_message"]);
				$("#messageBy").html(value["usr_name"]);
				$("#messageTime").html(value["feed_timestamp"]);
			}
		});
	});

	$(".blogBack").live("click",function(){
		$("#blogDescriptionContainer").fadeOut(200,function(){
			$("#blogTitleContainer").fadeIn(200);
		});
	});

	$(".blogExpand").live("click",function(){
		var id = $(this).attr('post');
		$("#blogTitleContainer").fadeOut(200,function(){
			$("#blogDescriptionContainer").html("<img src='img/ajax_preloader.gif'/>");
			$("#blogDescriptionContainer").fadeIn(200);
			$.getJSON('blogcontentlong.json',function(data){
				$("#blogDescriptionContainer").html('<span class="blogHeading">'+data["blogTitle"]+'</span><span class="blogBack">GO BACK</span><div id="blogLongContainer" class="blogShort blogLong">'+data["blogdesc"]+'</div><div id="blogBottom" class="blogBottom">Posted at:<span id="blogPostedAt">'+data["pubtime"]+'</span> by: <span id="blogPostedBy">'+data["name"]+'</span></div>');
			});
			
			
		});
	});

	$("#gallary").click(function(){
		$("#gallaryArea").html("<img src='img/ajax_preloader.gif' />").addClass('sponsorContentBox');
		$.getScript('js/jquery.gridAccordion.min.js', function() {
			$("#gallaryArea").load("gallary.html",function(){	
			$(".accordion").gridAccordion({
			width: 1360,
			height: 430,
			columns: 5,
			distance: 2,
			closedPanelWidth: 10,
			closedPanelHeight: 10,
			alignType: "centerCenter",
			slideshow: true,
		});
														  });
		});
		
		
	});
	

	$("#blogLink").click(function(){
		$.getJSON('blogcontent.json',function(data){
			var bloglist = [];
			$.each(data, function(key,value){
	//			eventlist.push('<option name="event-selected[]" value="'+value["evnt_id"]+'">'+value["evnt_name"]+'</option>');
				bloglist.push('<li><span class="blogHeading"><span class="blogExpand" post="'+value["blogid"]+'">'+value["blogTitle"]+'</span></span><div id="blogShortContainer" class="blogShort">'+value["blogshtdesc"]+'<span id="readMore" post="1" class="readMore blogExpand">Read More..</span></div><div id="blogBottom" class="blogBottom">Posted at: <span id="blogPostedAt">'+value["pubtime"]+'</span> by <span id="blogPostedBy">'+value["name"]+'</span></div></li>');
			});
			$("#blogTitles").html(bloglist.join(''));
		});
	});
	$('#resultLink').click(function(){
		$.getScript('js/accordion.js',function(){							
		 $.getJSON('result.json',function(json){
	 var result = [];
	 var numpos;
	 for( var i =0 ; i< json.length; i++)
	 {
	  numpos = json[i].numpos;
	  result.push("<dt>"+json[i].event_name+"</dt>");
	  result.push("<dd>");
	  for(var j=0; j<json[i].numpos.length;j++)
	   {
	   result.push("<b>"+json[i].numpos[j].position+"&nbsp;:</b>&nbsp;&nbsp;" +json[i].numpos[j].winner_name+"&nbsp;&nbsp;("+json[i].numpos[j].Winner_team+")<br/><br />");
	   }
	 result.push("</dd>");
	 }
	$("#result-accordion").html(result.join(''));
	$("dl#result-accordion").accordion1();
	 
 });
	});
	});
	
	
}); //end of document.ready

var eventsLoaded = false;
function loadCatagory(id){
	//displayCategory(id);
	if(eventsLoaded == false){
		$("#eventBox").load("users/service/catWiseInfo/",function(){
			eventsLoaded = true;
			$("#loading").hide();
			displayCategory(id);
		});
	}
	else{
		$('#loading').hide();
		displayCategory(id);
	}
}
function displayCategory(catid){
	$("#eventBox >div").hide();
	$("#"+catid).fadeIn(200);
	$(".content >div").hide(); // Initially hide all content
    $(".tabs >li:first").attr("for","current"); // Activate first tab
    $(".content > div:first").fadeIn(); // Show first tab content
	
	$(".event-content >div").hide(); // Initially hide all content
    $(".event-detail-tab >li:first").attr("id","current1").addClass("event-tab-selected"); // Activate first tab
    $(".event-content div:first").fadeIn(function(){
		$(".content >div:first").css('display','block');
	}); // Show first tab content
}

function showEvent(catid,eventid){
	showBox();
	loadCatagory(catid);
	loadEvent(eventid);
}

function loadEvent(eventid){
	$('#' +eventid).fadeIn(); // Show content for current tab
}	
var workshopLoaded = false;
function loadWorkshop(id){
	//displayCategory(id);
	if(workshopLoaded == false){
		$("#workshopBox").load("/users/service/workshops_with_design",function(){
			workshopLoaded = true;
			$("#loading").hide();
			displayWorkshop(id);
		});
	}
	else{
		$("#loading").hide();
		displayWorkshop(id);
	}
}

function displayWorkshop(catid){
	$("#workshopBox >div").hide();
	$("#"+catid).fadeIn(200);
	$(".content >div").hide(); // Initially hide all content
	$("#"+catid+"inner > div:first").show();
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


function showBox(){
	$('.backdrop, .box').animate({'opacity':'.70'}, 300, 'linear');
	$('.box').animate({'opacity':'1.00'}, 300, 'linear');
	$('.backdrop, .box').css('display', 'block');
}
function close_box()
{
	$('.backdrop, .box').animate({'opacity':'0'}, 300, 'linear', function(){
		$('.backdrop, .box').css('display', 'none');
	});
	$("#eventBox").hide();
	$('#loading').hide();
	$('#feedbackBox').hide();
	$('#newsfeedBox').hide();
}
 
/**
* author Remy Sharp
* url http://remysharp.com/tag/marquee
*/

(function ($) {
    $.fn.marquee = function (klass) {
        var newMarquee = [],
            last = this.length;

        // works out the left or right hand reset position, based on scroll
        // behavior, current direction and new direction
        function getReset(newDir, marqueeRedux, marqueeState) {
            var behavior = marqueeState.behavior, width = marqueeState.width, dir = marqueeState.dir;
            var r = 0;
            if (behavior == 'alternate') {
                r = newDir == 1 ? marqueeRedux[marqueeState.widthAxis] - (width*2) : width;
            } else if (behavior == 'slide') {
                if (newDir == -1) {
                    r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] : width;
                } else {
                    r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] - (width*2) : 0;
                }
            } else {
                r = newDir == -1 ? marqueeRedux[marqueeState.widthAxis] : 0;
            }
            return r;
        }

        // single "thread" animation
        function animateMarquee() {
            var i = newMarquee.length,
                marqueeRedux = null,
                $marqueeRedux = null,
                marqueeState = {},
                newMarqueeList = [],
                hitedge = false;
                
            while (i--) {
                marqueeRedux = newMarquee[i];
                $marqueeRedux = $(marqueeRedux);
                marqueeState = $marqueeRedux.data('marqueeState');
                
                if ($marqueeRedux.data('paused') !== true) {
                    // TODO read scrollamount, dir, behavior, loops and last from data
                    marqueeRedux[marqueeState.axis] += (marqueeState.scrollamount * marqueeState.dir);

                    // only true if it's hit the end
                    hitedge = marqueeState.dir == -1 ? marqueeRedux[marqueeState.axis] <= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState) : marqueeRedux[marqueeState.axis] >= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);
                    
                    if ((marqueeState.behavior == 'scroll' && marqueeState.last == marqueeRedux[marqueeState.axis]) || (marqueeState.behavior == 'alternate' && hitedge && marqueeState.last != -1) || (marqueeState.behavior == 'slide' && hitedge && marqueeState.last != -1)) {                        
                        if (marqueeState.behavior == 'alternate') {
                            marqueeState.dir *= -1; // flip
                        }
                        marqueeState.last = -1;

                        $marqueeRedux.trigger('stop');

                        marqueeState.loops--;
                        if (marqueeState.loops === 0) {
                            if (marqueeState.behavior != 'slide') {
                                marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
                            } else {
                                // corrects the position
                                marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);
                            }

                            $marqueeRedux.trigger('end');
                        } else {
                            // keep this marquee going
                            newMarqueeList.push(marqueeRedux);
                            $marqueeRedux.trigger('start');
                            marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
                        }
                    } else {
                        newMarqueeList.push(marqueeRedux);
                    }
                    marqueeState.last = marqueeRedux[marqueeState.axis];

                    // store updated state only if we ran an animation
                    $marqueeRedux.data('marqueeState', marqueeState);
                } else {
                    // even though it's paused, keep it in the list
                    newMarqueeList.push(marqueeRedux);                    
                }
            }

            newMarquee = newMarqueeList;
            
            if (newMarquee.length) {
                setTimeout(animateMarquee, 25);
            }            
        }
        
        // TODO consider whether using .html() in the wrapping process could lead to loosing predefined events...
        this.each(function (i) {
            var $marquee = $(this),
                width = $marquee.attr('width') || $marquee.width(),
                height = $marquee.attr('height') || $marquee.height(),
                $marqueeRedux = $marquee.after('<div ' + (klass ? 'class="' + klass + '" ' : '') + 'style="display: block-inline; width: ' + width + 'px; height: ' + height + 'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">' + $marquee.html() + '</div></div>').next(),
                marqueeRedux = $marqueeRedux.get(0),
                hitedge = 0,
                direction = ($marquee.attr('direction') || 'left').toLowerCase(),
                marqueeState = {
                    dir : /down|right/.test(direction) ? -1 : 1,
                    axis : /left|right/.test(direction) ? 'scrollLeft' : 'scrollTop',
                    widthAxis : /left|right/.test(direction) ? 'scrollWidth' : 'scrollHeight',
                    last : -1,
                    loops : $marquee.attr('loop') || -1,
                    scrollamount : $marquee.attr('scrollamount') || this.scrollAmount || 2,
                    behavior : ($marquee.attr('behavior') || 'scroll').toLowerCase(),
                    width : /left|right/.test(direction) ? width : height
                };
            
            // corrects a bug in Firefox - the default loops for slide is -1
            if ($marquee.attr('loop') == -1 && marqueeState.behavior == 'slide') {
                marqueeState.loops = 1;
            }

            $marquee.remove();
            
            // add padding
            if (/left|right/.test(direction)) {
                $marqueeRedux.find('> div').css('padding', '0 ' + width + 'px');
            } else {
                $marqueeRedux.find('> div').css('padding', height + 'px 0');
            }
            
            // events
            $marqueeRedux.bind('stop', function () {
                $marqueeRedux.data('paused', true);
            }).bind('pause', function () {
                $marqueeRedux.data('paused', true);
            }).bind('start', function () {
                $marqueeRedux.data('paused', false);
            }).bind('unpause', function () {
                $marqueeRedux.data('paused', false);
            }).data('marqueeState', marqueeState); // finally: store the state
            
            // todo - rerender event allowing us to do an ajax hit and redraw the marquee

            newMarquee.push(marqueeRedux);

            marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
            $marqueeRedux.trigger('start');
            
            // on the very last marquee, trigger the animation
            if (i+1 == last) {
                animateMarquee();
            }
        });            

        return $(newMarquee);
    };
}(jQuery));