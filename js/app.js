$(document).ready(function() {

	$('#add-button').on('click', function() {
		if ($('#new-item').val().trim()==0) {
			$('#new-item').attr('placeholder', "Please input an item to add to the list");
			$('#new-item').addClass('list-error')
		}
		else {
		$('#list').append(
			'<li><img class="delete-item" src="img/delete-item.png" alt="Delete Item">' +
			document.getElementById('new-item').value +
			'<img class="cart" src="img/cart.png" alt="Cart"></li>'
		);
		$("#new-item").attr('placeholder', "Type items here then push 'Enter' on your keyboard");
		$('#new-item').removeClass('list-error')
		$('#new-item').val('');
		};
	});

	$(this).on('keydown', function(e) {
		var newItem = (e.keyCode, e.which == 13)
		if (newItem) {
			$('#add-button').click();
		};
	});

	$('#clear-button').on('click', function() {
		$('#list').find('li').remove();
	});

	$('#list').on('click', '.cart', function() {
		$(this).closest('li').toggleClass('in-cart');
	});

	$('#list').on('click', '.delete-item', function() {
		$(this).parent().remove();
	});

	$('#list').on('mouseenter', 'li', function() {
		$(this).find('img').show();
	});

	$('#list').on('mouseleave', 'li', function() {
		$(this).find('img').hide();
	});

});