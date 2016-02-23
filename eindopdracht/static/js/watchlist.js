var watchlist = (function() {
	var watchlist = [];
	var init = function() {
		events();
		checkSync();		
	};
	var events = function() {
		// Add click events to all checkboxes
		var checkboxes = document.querySelectorAll('input[type="checkbox"]');
		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].addEventListener("click", pushToArray);
		};
	};
	var getStorage = function() {
		// Check if an object is saved in local storage
		var storage = JSON.parse(localStorage.getItem('watchlist'));
		if (storage) {
			// If the object exists, render the watchlist
			watchlist = storage;
			render();
		};
	};
	var pushToArray = function() {
		// Check if the checkbox is checked
		if (this.checked) {
			// If checked, push to array
			watchlist.push(this.data);
		} else {
			// If not checked, go through the watchlist and check what object is matching the clicked checkbox
			for (var i = 0; i < watchlist.length; i++) {
				if(watchlist[i].imdbID == this.data.imdbID) {
					// Delete the object from the array
					// Source: http://stackoverflow.com/questions/5767325/remove-a-particular-element-from-an-array-in-javascript
					var remove = watchlist[i];
					var index = watchlist.indexOf(remove);
					if (index > -1) {
					    watchlist.splice(index, 1);
					};
				};
			};
		};

		// Put the object in local storage
		localStorage.setItem('watchlist', JSON.stringify(watchlist));

		// Render the watchlist
		render();
	};
	var checkSync = function() {
		// Uncheck all checkboxes
		var uncheck = document.querySelectorAll('input[type="checkbox"]');
		for (var j = 0; j < uncheck.length; j++) {
			uncheck[j].checked = false;
		};

		// Check all checkboxes of the movies that are in the watchlist array
		for (var i = 0; i < watchlist.length; i++) {
			var check = document.querySelectorAll('input[value='+watchlist[i].imdbID+']');
			for (var k = 0; k < check.length; k++) {
				check[k].checked = true;
			};
		};
	};
	var render = function() {
		// Declare all functions to get data from object
		var liId = function() {return 'searchLi-'+this.imdbID}
		var href = function() {return '#detail/'+this.imdbID}
		var valueId = function() {return this.imdbID}
		var title = function() {return this.Title}
		var img = function() {return this.Poster}
		var year = function() {return this.Year}
		var checkboxId = function() {return 'checkboxWatchlist-'+this.imdbID}

		// Object to let Transparency know what values to give which element
		var directives = {
		  ahref: {href: href},
		  searchresult: {id: liId, value: valueId},
		  img: {src: img},
		  title: {text: title},
		  year: {text: year},
		  checkbox: {id: checkboxId, value: valueId},
		  label: {for: checkboxId}
		};

		// Render the watchlist
		Transparency.render(el.listWatchlist, watchlist, directives);

		// Link the object to the right checkbox, so we can get the object when we click it
		var results = watchlist;
		for (var i = 0; i < results.length; i++) {
			var data = results[i];
			el.listWatchlist.children[i].querySelector('input[type="checkbox"]').data = data;
		};

		// Now there are new checkboxes, so new click events should be made, so we fire the init function
		init();		
	};
	// Return public functions
	return {
		init: init,
		getStorage: getStorage
	};
}());