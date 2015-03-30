$(document).ready(function() {
	var items = JSON.parse(localStorage.getItem('items'));
	var itemNumber = 1
	console.log(items);
	
	runApp(items, itemNumber);	
});

function runApp(items, itemNumber) {
	addItem(items, itemNumber)
	returnKey()
	mouseActions()
	toggleItem(items)
	removeItem(items)
	clearList(items, itemNumber)
}

function addItem(items, itemNumber) {
	$('#add-button').on('click', function() {
		if ($('#new-item').val().trim()==0) {
			$('#new-item').attr('placeholder', "Please input an item to add to the list");
			$('#new-item').addClass('list-error')
		} else {
			$('#list').append(
				'<li value="item' + itemNumber + '"><img class="delete-item" src="img/delete-item.png" alt="Delete Item">' +
				document.getElementById('new-item').value +
				'<img class="cart" src="img/cart.png" alt="Cart"></li>'
			);

			// Add new item to storage
			var item = {}
			item.id = "item" + itemNumber
			item.name = document.getElementById('new-item').value
			item.toggle = "out-cart"
			items.push(item);
			itemNumber++;

			updateStorage(items);

			// Reset
			$("#new-item").attr('placeholder', 'Type items here then push Enter on your keyboard');
			$('#new-item').removeClass('list-error')
			$('#new-item').val('');
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
		// Update item's status in storage
		var selectedItem = $(this).parent().attr('value');
		var itemIndex = findIndex(items, selectedItem);
		if (items[itemIndex].toggle === "out-cart") {
			items[itemIndex].toggle = "in-cart"
		} else {
			items[itemIndex].toggle = "out-cart"
		}
		updateStorage(items);

		// Fade item
		$(this).closest('li').toggleClass('in-cart');

		console.log(selectedItem + " now " + items[itemIndex].toggle);
	});
}

function removeItem(items) {
	$('#list').on('click', '.delete-item', function() {
		// Remove item from storage
		var selectedItem = $(this).parent().attr('value');
		var itemIndex = findIndex(items, selectedItem);
		items.splice(itemIndex,1);
		updateStorage(items);

		console.log("Removed " + selectedItem)

		// Remove item from list
		$(this).parent().remove();

		console.log(items);
	});
}

function clearList(items, itemNumber) {
	$('#clear-button').on('click', function() {
		// Clear storage
		items.splice(0, items.length);
		updateStorage(items);

		// Clear list
		$('#list').find('li').remove();
		
	});
	
}

function findIndex(items, selectedItem) {
	// Search items array using element ids'
	for (var i = 0; i < items.length; i++) {
		if (items[i].id === selectedItem) {
			return i;
		};
	};
}

function updateStorage(items) {
	localStorage.setItem('items', JSON.stringify(items));
	var trial = JSON.parse(localStorage.getItem('items'));
	console.log(trial);
}

