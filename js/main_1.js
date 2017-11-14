/*
AUTHOR   : SimplePixel
URL      : http://themeforest.net/user/SimplePixel
TEMPLATE : Elito - Coming Soon Template
VERSION  : 1.0

TABLE OF CONTENTS
1.0 TEMPLATE SETTINGS
2.0 FUNCTIONS
3.0 window.resize FUNCTION
4.0 window.load FUNCTION
	4.1 activate word rotator plugin
5.0 window.scroll FUNCTION
6.0 document.ready FUNCTION
	6.1 adjust page-container width
	6.2 action when menu panel clicked
	6.3 action when close menu button clicked
	6.4 action when show countdown button clicked
	6.5 action when close countdown button clicked
	6.6 action when subscribe button clicked
	6.7 action when close subscribe clicked
	6.8 action when menu lists clicked
	6.9 activate slideshow background using backstretch
	6.10 activate slideshow background with kenburns effect
	6.11 activate single image background + firefly effect
	6.12 activate single image background + star effect (constellation)
	6.13 activate YouTube video background
	6.14 activate self hosted video background
	6.15 activate perfect scrollbar
	6.16 activate countdown	
	6.17 init carousel for team list
	6.18 activate magnific popup image gallery
	6.19 init carousel for quote in menu
	6.20 validate and submit subscribe form
	6.21 validate and submit contact us form

*/

(function($) {
	"use strict";
	
	/*-- ================================ --
		1.0 TEMPLATE SETTINGS
	/*-- ================================ --*/
	$.bg_type = 1;
	/*
	* 1. Backstretch slideshow background
	* 2. Slideshow background with Kenburns Effect
	* 3. Single image background + firefly effect
	* 4. Single image background + star effect (constellation)
	* 5. YouTube video background
	* 6. Self hosted video background
	*/
	$.launch_date = [21,11,2017];											//-- launch date [d,m,yyyy], for example 1 September 2015 : [1,9,2015]
	$.bg_urls = ["img/sample1.jpg", "img/sample2.jpg"];
	$.youtube_url = "";													//-- just the last words after https://www.youtube.com/watch?v=
	$.self_host_video_path = "";										//-- self hosted video path
	$.self_host_video_filename = "";									//-- self hosted video filename "WITHOUT .MP4 EXTENSION"
	$.wordrotator_words = ["Show Mulher", "Agda Prado"];	//-- Array of words, for subtitle in home-section
	
	
	/*-- ================================ --
		2.0 FUNCTIONS
	/*-- ================================ --*/
	function AdjustPageContainer(){
		//-- only on tablets and large devices
		if($(window).width() > 767){
			//-- adjust the page-container width according to the screen width
			var container_width = $(window).width() - 80;
			$('.page-container').css({
				width:container_width
			});	
		}
		else{
			$('.page-container').css({
				width:'100%',
				left:0
			});
		}
	}
	
	/*-- ================================ --
		3.0 window.resize FUNCTION
	/*-- ================================ --*/
	$(window).resize(function(e) {
		//-- adjust page-container when user rotating their tablet
		AdjustPageContainer();
    });
	//-- end window.resize function
	
	/*-- ================================ --
		4.0 window.load FUNCTION
	/*-- ================================ --*/
	$(window).load(function(e) {
		//-- hide preloader
		$('.preloader').addClass('is-hidden');
		
		//-- show home section
		var show_home = setTimeout(function(){
			$('.preloader').hide();
			
			$('.home-section').addClass('is-visible');
			
			//-- 4.1 activate word rotator plugin
			$("#wordsrotator").wordsrotator({
    			autoLoop: true,                  										//-- auto rotate words
    			randomize: false,                										//-- show random entries from the words array
    			stopOnHover: false,              										//-- stop animation on hover
    			changeOnClick: false,            										//-- force animation run on click
    			animationIn: "fadeInDown",          									//-- css class for entrace animation
    			animationOut: "fadeOutUp",        										//-- css class for exit animation
    			speed: 3000,               		 										//-- delay in milliseconds between two words
    			words: $.wordrotator_words  											//-- Array of words, it may contain HTML values
			});
			
			clearTimeout(this);
		},1000);
    });
	//-- end window.load function
	
	/*-- ================================ --
		5.0 window.scroll FUNCTION
	/*-- ================================ --*/
	$(window).scroll(function(e) {
		
    });
	//-- end window.scroll function
	
	
	/*-- ================================ --
		6.0 document.ready FUNCTION
	/*-- ================================ --*/
	$(document).ready(function(e) {		
		//-- 6.1 adjust page-container width 
		AdjustPageContainer();
		
		//-- 6.2 action when menu panel clicked
		$('.panel-menu-small').on('click',function(){
			$('.panel-menu-big, .panel-menu-big .left-side, .panel-menu-big .right-side, .close-menu-container').addClass('is-visible');
		});
		
		//-- 6.3 action when close menu button clicked
		$('.close-menu').on('click',function(){
			$('.panel-menu-big, .panel-menu-big .left-side, .panel-menu-big .right-side, .close-menu-container').removeClass('is-visible');
		});
		
		//-- 6.4 action when show countdown button clicked
		$('.countdown-button').on('click',function(){
			$('.home-section').removeClass('is-visible');
			$('.countdown-section').addClass('is-visible');
		});
		
		//-- 6.5 action when close countdown button clicked
		$('.close-countdown').on('click',function(){
			$('.countdown-section').removeClass('is-visible');
			$('.home-section').addClass('is-visible');
		});
		
		//-- 6.6 action when subscribe button clicked
		$('.subscribe-button').on('click',function(){
			$('.home-section').removeClass('is-visible');
			$('.bg-container').addClass('white');
			$('.subscribe-section').addClass('is-visible');
		});
		
		//-- 6.7 action when close subscribe clicked
		$('.close-subscribe').on('click',function(){
			$('.home-section').addClass('is-visible');
			$('.bg-container').removeClass('white');
			$('.subscribe-section').removeClass('is-visible');
		});
		
		//-- 6.8 action when menu lists clicked
		$('.menu-list').find('a').each(function(index, element) {
            $(this).on('click',function(){
				var next_section = $(this).data('rel');
				var prev_section = $('.menu-list').find('.active').data('rel');
								
				if(next_section != prev_section){
					//-- set current active menu
					$('.menu-list').find('.active').removeClass('active');
					$(this).addClass('active');
				
					//-- change bg-overlay color
					if(next_section == "home"){
						$('.bg-container').removeClass('white');
					}
					if(prev_section == "home"){
						$('.bg-container').addClass('white');
						
						//-- hide countdown section and subscribe section
						if($('.subscribe-section').hasClass('is-visible')){
							$('.subscribe-section').removeClass('is-visible');
						}
						if($('.countdown-section').hasClass('is-visible')){
							$('.countdown-section').removeClass('is-visible');
						}
					}
				
					//-- hide prev section
					$('.'+prev_section+'-section').removeClass('is-visible');
				
					//-- show next section
					$('.'+next_section+'-section').addClass('is-visible');
					
					//-- close menu
					$('.panel-menu-big, .panel-menu-big .left-side, .panel-menu-big .right-side, .close-menu-container').removeClass('is-visible');
				}
			});
        });
		
		//-- 6.9 activate slideshow background using backstretch
		if($.bg_type == 1){
			$(".bg-container").backstretch($.bg_urls,{
				duration:6000,
				fade:'normal'
			});
		}
		//-- 6.10 activate slideshow background with kenburns effect
		else if($.bg_type == 2){
			var i=0;
			for(i;i<$.bg_urls.length;i++){
				var html_code = '<img src="'+$.bg_urls[i]+'" alt="bg-'+i+'" />';
				
				//-- append image to bg-container
				$('.bg-container').append(html_code);	
			}
			
			//-- activate kenburns
			$(".bg-container").kenburnsy({
        		fullscreen: true
        	});
		}
		//-- 6.11 activate single image background + firefly effect
		else if($.bg_type == 3){
			$(".bg-container").backstretch([
				$.bg_urls
			],{
				duration:6000,
				fade:'normal'
			});
			
			$.firefly({
				color: '#d2d2d2',	//-- firefly color
				minPixel: 1,					
				maxPixel: 3,
				total : 50,
				on: '.bg-container'
			});
		}
		//-- 6.12 activate single image background + star effect (constellation)
		else if($.bg_type == 4){
			$(".bg-container").backstretch([
				$.bg_urls
			],{
				duration:6000,
				fade:'normal'
			});
			
			var canvas = '<canvas id="bg-canvas"> </canvas>';
			$('.page-container').prepend(canvas);
			
			//-- init star effect
			if($(window).width() < 700){
					$('canvas').constellation({
					distance: 40
				});
			}
			else{
				$('canvas').constellation();
			}
		}
		//-- 6.13 activate YouTube video background
		else if($.bg_type == 5){
			//-- put the video to the body
			var vid_elem = '<a id="video" class="player" data-property="{videoURL:\''+$.youtube_url+'\',containment:\'.bg-container\', showControls:false, autoPlay:true, loop:true, mute:true, startAt:0, opacity:1, addRaster:false, quality:\'large\'}"></a>';
			
			$('body').prepend(vid_elem);
			
			//-- activate plugin
			if($(window).width() >= 1200){
				/*
				* Please note that this player doesn’t work as background for devices due to the restriction policy adopted by all on 
				* managing multimedia files via javascript. It fallsback to the default Youtube player if used as player (not applied to the body).
				*/
				
				$('.player').mb_YTPlayer();
			}
			else{
				$(".bg-container").backstretch([
					$.bg_urls
				],{
					duration:6000,
					fade:'normal'
				});
			}
		}
		//-- 6.14 activate self hosted video background
		else if($.bg_type == 6){
			var videobackground = new $.backgroundVideo($('.bg-container'), {
        		"align": "centerXY",
				"width": 1280,
        		"height": 720,
        		"path": $.self_host_video_path,
        		"filename": $.self_host_video_filename,
        		"types": ["mp4"]
      		});
		}
		
		//-- 6.15 activate perfect scrollbar (only on large devices)
		if($(window).width() >= 1200){
			$('.about-section, .portfolio-section, .contact-section').perfectScrollbar();
		}
		
		//-- 6.16 activate countdown
		$('.countdown-container').countDown({
			targetDate: {
				'day': 		$.launch_date[0],
				'month': 	$.launch_date[1],
				'year': 	$.launch_date[2],
				'hour': 	0,
				'min': 		0,
				'sec': 		0
			},
			omitWeeks: true
		});
		
		//-- 6.17 init carousel for team list
		var team_carousel = $('.team-container');
		team_carousel.owlCarousel({
			items:3,
			itemsDesktopSmall: [1024,3],
			itemsTablet: [768,2],
			itemsMobile: [479,1],
			navigation:false,
			pagination:false
		});
		//-- team carousel custom control
		$('.next-team').on('click',function(){
			team_carousel.trigger('owl.next');
		});
		$('.prev-team').on('click',function(){
			team_carousel.trigger('owl.prev');
		});
		
		//-- 6.18 activate magnific popup image gallery
        $('.popup-image').magnificPopup({ 
  			type: 'image',
			gallery: {
				enabled: true,
  				tPrev: 'prev',
  				tNext: 'next',
				tCounter: '%curr% / %total%'
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
		//-- 6.19 init carousel for quote in menu
		$('.quote-container').owlCarousel({
			singleItem: true,
			navigation: false,
			pagination: false,
			autoPlay: 4000,
			transitionStyle: "backSlide"
		});
		
		//-- 6.20 validate and submit subscribe form
		$('.subscribe-form').validate({
			rules: {
	        	EMAIL: {
	            	required: true,
	                email: true
	            }
	        },
			messages: {
				EMAIL: {
					required: "Please insert your email address",
					email: "Your email address is not valid"
				}
			},
			highlight: function(element, errorClass, validClass) {
				$(element).addClass('form-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass('form-error');
			},
			errorPlacement: function(error, element) {
    			
 			},
			submitHandler: function(form) {							
				var url_dest = $(form).attr('action');
				var form_data = $(form).serialize();
				var form_method = $(form).attr('method');
			
				//-- show loading
				$('.subscribe-notif').show().append('<label class="loading-subscribe">Please wait</label>');
				$('.loading-subscribe').fadeIn('fast');
			
				$.ajax({
					type: form_method,
	        		url: url_dest,
	        		data: form_data,
	        		cache : false,
	        		dataType : 'json',
	        		contentType: "application/json; charset=utf-8",
	        		error : function(err) { alert("Could not connect to the registration server. Please try again later."); },
	        		success : function(data) {
	            		if(data.result == "success"){
							//-- reset form
							$(form).trigger('reset');
							
							//-- set element to focusout and remove error class
							$('.subscribe-email').focusout();
							$(form).find('.form-error').removeClass('form-error');
					
							//-- hide loading
							$('.loading-subscribe').fadeOut('fast',function(){
								//-- show notif
								$('.subscribe-notif').append('<label class="subscribe-notif-success">Thank you for subscribing us.</label>');
								$('.subscribe-notif-success').fadeIn('fast').delay(5000).fadeOut('fast',function(){
									$(this).remove();
									$('.loading-subscribe').remove();
								});
							});
						}
						else{
							//-- reset form
							$(form).trigger('reset');
					
							//-- hide loading
							$('.loading-subscribe').fadeOut('fast',function(){
								//-- show notif
								$('.subscribe-notif').append('<label class="subscribe-notif-error">Error.</label>');
								$('.subscribe-notif-error').fadeIn('fast').delay(5000).fadeOut('fast',function(){
									$(this).remove();
									$('.loading-subscribe').remove();
								});
							});
						}
	        		}
				});
							
				return false;
			}
		});
		//-- end validate and submit subscribe form
		
		//-- 6.21 validate and submit contact us form
		$('.contact-form').validate({
			rules: {
	        	email: {
	            	required: true,
	                email: true
	            },
				name: {
	            	required: true
	            },
				message: {
	            	required: true
	            }
	        },
			highlight: function(element, errorClass, validClass) {
				$(element).addClass('form-error');
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass('form-error');
			},
			errorPlacement: function(error, element) {
    			
 			},
			submitHandler: function(form) {
				var url_dest = $(form).attr('action');
				var form_data = $(form).serialize();
				
				//-- show loading
				$('.contact-notif').show().append('<label class="loading-contact">Please wait</label>');
				$('.loading-contact').fadeIn('fast');
			
				$.post(url_dest,form_data,function(data){
					var success = data;
					
					if(success){
						//-- reset form
						$(form).trigger('reset');
					
						//-- hide loading
						$('.loading-contact').fadeOut('fast',function(){
							//-- show notif
							$('.contact-notif').append('<label class="contact-notif-success">Thank you for contacting us. We will reply you shortly.</label>');
							$('.contact-notif-success').fadeIn('fast').delay(5000).fadeOut('fast',function(){
								$(this).remove();
								$('.loading-contact').remove();
							});
						});
					}
					else{
						//-- reset form
						$(form).trigger('reset');
						
						//-- hide loading
						$('.loading-contact').fadeOut('fast',function(){
							//-- show notif
							$('.contact-notif').append('<label class="contact-notif-error">Error.</label>');
							$('.contact-notif-error').fadeIn('fast').delay(5000).fadeOut('fast',function(){
								$(this).remove();
								$('.loading-contact').remove();
							});
						});
					}
				});
				
				return false;
			}
		});
		//-- end validate and submit contact us form
    });
	//-- end document.ready function
})(jQuery);