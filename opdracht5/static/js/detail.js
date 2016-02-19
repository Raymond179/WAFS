// Detail state object
var detail = (function() {
	// The object with the detailed data
	var detailObject = []
	var apiCall = function(id) {
		// Declare new Promise function
		var promise = new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();

			// When it starts getting data, show the loader
			xhr.onloadstart = function() {
				search.loading('show', el.detailScreen);
			}
			// When its done getting the data, hide the loader
			xhr.onloadend = function() {
				search.loading('hide', el.detailScreen);
			}

			xhr.open('GET', 'http://www.omdbapi.com/?i='+id+'&r=json&plot=full', true);
			xhr.send(null);

			// When data is ready, resolve the object
			xhr.onreadystatechange = function() {
			    if (xhr.readyState == 4) {
			        var json = JSON.parse(xhr.responseText);
			        resolve(json);	    
				}
			};
		})
		return promise;
	}
	var pushToArray = function(id) {
		// Fire apiCall. When the data is succesfully received, object = searchResults. Then render and display the list
		apiCall(id).then(function (object) {
			detailObject = object;
			render();
		})
		.catch(function() {
			// If an error occurred, alert there is something wrong
			alert('Something went wrong')
		});		
	}
	var render = function() {
		// Declare all functions to get data from object
		var valueId = function() {return this.imdbID}
		var title = function() {return this.Title}
		var img = function() {return this.Poster}
		var year = function() {return this.Year}
		var checkboxId = function() {return 'checkboxDetail-'+this.imdbID}
		var rating = function() {return 'IMDb: '+this.imdbRating}
		var actors = function() {return this.Actors}
		var description = function() {return this.Plot}

		// Object to let Transparency know what values to give which element
		var directives = {
		  detail_img: {src: img},
		  detail_rating: {text: rating},
		  detail_title: {text: title},
		  detail_year: {text: year},
		  detail_checkbox: {id: checkboxId, value: valueId},
		  detail_label: {for: checkboxId},
		  actors: {text: actors},
		  description: {text: description}
		};

		// Render
		Transparency.render(el.detailScreen, detailObject, directives);

		// Link the object to the right checkbox, so we can get the object when we click it
		el.detailScreen.querySelector('input[type="checkbox"]').data = detailObject;
		
		// There are new checkboxes, so fire watchlist.init
		watchlist.init();
	}
	// Return public functions
	return {
		pushToArray: pushToArray
	}
}());