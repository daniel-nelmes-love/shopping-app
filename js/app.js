$(document).ready(function() {

	$('.cart').on('click', function() {
		if ($(this).closest('li').hasClass('in-cart')) {
			$(this).closest('li').removeClass('in-cart');
		}
		else {
			$(this).closest('li').addClass('in-cart');
		};	
	});

})