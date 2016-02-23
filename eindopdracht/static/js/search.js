// Object for searching movies
var search = (function() {
	var searchResults = []
	var init = function() {
		events();
		listState('hide');
	};
	var events = function() {
		// Add event listener to submit of the form button
		el.form.addEventListener("submit", getValue);
	};
	var listState = function(state) {
		// If the list is empty, hide the list. If not, show the list
		if (state == 'show') {
			el.list.classList.add('show')
			el.list.classList.remove('hide')
		} else {
			el.list.classList.add('hide')
			el.list.classList.remove('show')
		};
	};
	var apiCall = function(search) {
		// Declare new Promise function
		var promise = new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.onloadstart = function() {
				states.loading('show', el.list);
			}

			xhr.onloadend = function() {
				states.loading('hide', el.list);
			}

			// Encode search string as URI
			var searchURI = encodeURI(search)

			xhr.open('GET', 'http://www.omdbapi.com/?s='+searchURI+'&r=json', true); // Get data from the url
			xhr.send(null);

			// When the data is received
			xhr.onreadystatechange = function() {
				// Check if the data is ready
			    if (xhr.readyState == XMLHttpRequest.DONE) {
			    	var status = xhr.status;
			    	// Check if an object is received
			    	if( (status >= 200 && status < 300) || status === 304 ) {
			    		var json = JSON.parse(xhr.responseText);
			    		// Tell the promise it succeded and return the object
			        	resolve(json);
			    	} else {
			    		// Tell the promise an error occurred
			    		reject(json);
			    	}
			    }
			}
		})
		return promise;
	};
	var pushToArray = function(search) {
		// Fire apiCall with the search string
		apiCall(search)
			.then(function (object) {
				// When the data is succesfully received, object = searchResults. Then render and display the list
				searchResults = object;
				filter();
				render();
			})
			.catch(function() {
				// If an error occurred, alert there is something wrong
				alert('Something went wrong')
			})
	};
	
	var getValue = function(e) {
		// Prevent refreshing
		e.preventDefault();
		// Get value of the search input
		var value = el.searchvalue.value;

		// If value is more than 1 character, pus value to array
		if (value.length > 1) {
			// Fire  pushToArray
			pushToArray(value);
		} else {
			alert('Fill in at least 2 characters');
		};	
	};
	var filter = function() {
		// Returns an array with all movie titles
		var titleArray = _.map(searchResults.Search, function (value) {
		    return value.Title
		});

		// Returns all titles as a string
		var titleString = _.reduce(searchResults.Search, function (str, movie) {
		    return movie.Title + str;
		}, '');

		// Filter out all the movies without an image
		var goodImages = _.filter(searchResults.Search, function(out){ 
			return out.Poster != 'N/A'; 
		});
		// Place the object as the new searchresults object
		searchResults = goodImages;
	};
	var render = function() {
		// Declare all functions to get data from object
		var liId = function() {return 'searchLi-'+this.imdbID}
		var href = function() {return '#detail/'+this.imdbID}
		var valueId = function() {return this.imdbID}
		var title = function() {return this.Title}
		var img = function() {return this.Poster}
		var year = function() {return this.Year}
		var checkboxId = function() {return 'checkboxSearch-'+this.imdbID}

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

		// Render
		Transparency.render(el.list, searchResults, directives);

		// Show the list
		listState('show');

		// Link the object to the right checkbox, so we can get the object when we click it
		var results = el.list.children;
		for (var i = 0; i < results.length; i++) {
			var data = searchResults[i];
			results[i].querySelector('input[type="checkbox"]').data = data;
		};

		// There are new checkboxes, so fire watchlist.init
		watchlist.init();
	};
	// Return public functions
	return {
		init: init
	};
}());