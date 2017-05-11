jQuery(document).ready(function() {
	$.backstretch(['img/backgrounds/1.jpg', 'img/backgrounds/2.png',
		'img/backgrounds/5.png',],{duration:3000, fade:750});

    new WOW().init();
    
	var countTo = "2017/06/01";
	$('.timer').countdown(countTo, function(event) {
		$(this).find('.days').text(event.offset.totalDays);
		$(this).find('.hours').text(event.offset.hours);
		$(this).find('.minutes').text(event.offset.minutes);
		$(this).find('.seconds').text(event.offset.seconds);
	});
});