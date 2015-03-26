$(document).ready(function() {
var itemNumber = 0
var items = []

	addItem(itemNumber, items)
	returnKey()
	mouseActions()
	toggleItem(items)
	removeItem()
	clearList()
});

function addItem(itemNumber, items) {
	$('#add-button').on('click', function() {
		if ($('#new-item').val().trim()==0) {
			$('#new-item').attr('placeholder', "Please input an item to add to the list");
			$('#new-item').addClass('list-error')
		}
		else {
			itemNumber++
			$('#list').append(
				'<li value="item' + itemNumber + '"><img class="delete-item" src="img/delete-item.png" alt="Delete Item">' +
				document.getElementById('new-item').value +
				'<img class="cart" src="img/cart.png" alt="Cart"></li>'
			);
			$("#new-item").attr('placeholder', 'Type items here then push Enter on your keyboard');
			$('#new-item').removeClass('list-error')

			
			var item = {}
			item.id = "item" + itemNumber
			item.name = document.getElementById('new-item').value
			item.toggle = "On"
			items.push(item);
			console.log(items);

			$('#new-item').val('');
			console.log(itemNumber);

		};
	});
}

function returnKey() {
	$(this).on('keydown', function(e) {
		var newItem = (e.keyCode, e.which == 13)
		if (newItem) {
			$('#add-button').click();
		};
	});
}

function mouseActions() {
	$('#list').on('mouseenter', 'li', function() {
		$(this).find('img').show();
	});

	$('#list').on('mouseleave', 'li', function() {
		$(this).find('img').hide();
	});
}

function toggleItem(items) {
	$('#list').on('click', '.cart', function() {
		function findIndex(selectedItem) {
			for (var i = 0; i < items.length; i++) {
				if (items[i].id = selectedItem) {
					return i - 1
				};
			};
		}

		var selectedItem = $(this).parent().attr('value');
		findIndex(selectedItem);
		console.log(items[findIndex]);

		//if (items[index].toggle="On") {
		//	items[index].toggle="Off"
		//} else {
		//	items[index].toggle="On"
		//}
		//console.log(items(tempItem.toggle));


		$(this).closest('li').toggleClass('in-cart');
	});
	//var tempItem = $.grep(items, function(e){return e.id==id;});

}

function removeItem() {
	$('#list').on('click', '.delete-item', function() {
		$(this).parent().remove();
	});
}

function clearList() {
	$('#clear-button').on('click', function() {
		$('#list').find('li').remove();
	});
	itemNumber = 0
}