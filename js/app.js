$(document).ready(function() {

	// Call stored array
	var storedItems = JSON.parse(localStorage.getItem('items'))
	if (storedItems === null) {
		var items = []
	} else {
		var items = storedItems
	};
	var itemNumber = 1

	// Reload list and itemNumber
	if (items.length > 0) {
		itemNumber = reloadList(items, itemNumber);
	};
	
	// Continue list
	runApp(items, itemNumber);	
});

function reloadList(items, itemNumber) {
	for (var i = 0; i <items.length; i++) {
		addItem(items[i].itemName, itemNumber, items[i].itemClass);
		items[i].itemId = "item" + itemNumber;
		itemNumber++;
	};
	return itemNumber;
}

function addItem(itemName, itemNumber, itemClass) {
	$('#list').append(
		'<li value="item' + itemNumber + '" class="' + itemClass + '"><img class="delete-item" src="img/delete-item.png" alt="Delete Item">' +
		itemName +
		'<img class="cart" src="img/cart.png" alt="Cart"></li>'
	);
}

function runApp(items, itemNumber) {
	checkInput(items, itemNumber);
	returnKey();
	mouseActions();
	toggleItem(items);
	removeItem(items);
	clearList(items, itemNumber);
}

function checkInput(items, itemNumber) {
	$('#add-button').on('click', function() {
		if ($('#new-item').val().trim()==0) {
			$('#new-item').attr('placeholder', "Please input an item to add to the list");
			$('#new-item').addClass('list-error')
		} else {
			// Add new item to list
			var itemName = document.getElementById('new-item').value
			addItem(itemName, itemNumber, "out-cart");

			// Add new item to storage
			var item = {}
			item.itemId = "item" + itemNumber
			item.itemName = itemName
			item.itemClass = "out-cart"

			items.push(item);
			updateStorage(items);

			// Reset input
			$("#new-item").attr('placeholder', 'Type items here then push Enter on your keyboard');
			$('#new-item').removeClass('list-error')
			$('#new-item').val('');
			itemNumber++;
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
		if (items[itemIndex].itemClass === "out-cart") {
			items[itemIndex].itemClass = "in-cart"
		} else {
			items[itemIndex].itemClass = "out-cart"
		}
		updateStorage(items);

		// Update item's class
		$(this).closest('li').toggleClass('out-cart');
		$(this).closest('li').toggleClass('in-cart');
	});
}

function removeItem(items) {
	$('#list').on('click', '.delete-item', function() {
		// Remove item from storage
		var selectedItem = $(this).parent().attr('value');
		var itemIndex = findIndex(items, selectedItem);
		items.splice(itemIndex, 1);
		updateStorage(items);

		// Remove item from list
		$(this).parent().remove();
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
	// Search items array using itemId
	for (var i = 0; i < items.length; i++) {
		if (items[i].itemId === selectedItem) {
			return i;
		};
	};
}

function updateStorage(items) {
	localStorage.setItem('items', JSON.stringify(items));
}

