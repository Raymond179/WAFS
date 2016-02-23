// States object
var states = (function() {
	// Declare all routes
	var routes = ['search', 'watchlist', 'detail'];
	var init = function() {
		events();
	};
	var events = function() {
		// Fire render function on hash change and on refresh
		window.addEventListener("hashchange", render, false);
		window.addEventListener("load", render, false);

		// Make new hammer
		var mc = new Hammer(el.screens);
		// Set pan to horizontal direction and threshold to 100px
		mc.add( new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL, threshold: 200}));

		// When swipe left, set hash to watchlist
		mc.on("panleft", function(ev) {
			location.hash = 'watchlist';
		});

		// When swipe right, set hash to search
		mc.on("panright", function(ev) {
			location.hash = 'search';
		});
	};
	var loading = function(state, elem) {
		if (state == 'show') {
			// Hide the list and show the loading gif
			elem.classList.add('hide');
			elem.classList.remove('show');
			for (var i = 0; i < el.loading.length; i++) {
				el.loading[i].classList.add('show');
				el.loading[i].classList.remove('hide');
			}
		} else {
			// Show the list and hide the loading gif
			elem.classList.add('show');
			elem.classList.remove('hide');
			for (var i = 0; i < el.loading.length; i++) {
				el.loading[i].classList.add('hide');
				el.loading[i].classList.remove('show');
			}
		}
	};
	var render = function() {
		// Declare hash as the current hash without #
		var hash = window.location.hash.replace('#', '');

		// Remove everything after the slash. Source: http://stackoverflow.com/questions/5631384/remove-everything-after-a-certain-character
		var s = hash;
		var n = s.indexOf('/');
		hash = s.substring(0, n != -1 ? n : s.length);

		// If no hash, set the hash to #search
		if (!hash) {
			window.location.hash = 'search';
		} else if (hash == 'detail') {
			// If the hash is detail load the id after the slash and send it detail.pushToArray to render the right information
			var id = window.location.hash.replace('#detail/', '')
			detail.pushToArray(id);
		}

		// Loop throug the routes
    	for(var i = 0; i < routes.length; i++) {
    		// Find the element of the current route
    		var elem = document.querySelector('#'+routes[i]+'_');
    		// Find the a where href is equal to the hash.
    		var active = document.querySelector('#navigation a[href="#'+routes[i]+'"]');
    		// If the route is the hash, display the right section and make the right menu button active. If not, do the opposite
    		if(routes[i] != hash) {
    			// If the route is not detail, make the sections animate by adding and deleting classes
    			if (routes[i] != 'detail') {
    				active.parentElement.classList.remove('active-menu-button');
    				el.screens.classList.remove(routes[i]);
    			} else {
    				elem.classList.add('hide');
					elem.classList.remove('show');
    			}
    		} else {
    			if (routes[i] != 'detail') {
    				active.parentElement.classList.add('active-menu-button');
    				el.screens.classList.add(routes[i]);
    			} else {
    				elem.classList.add('show');
					elem.classList.remove('hide');
    			}
    		};

    		// If the hash is detail, display the detail screen and hide the other screens
    		if (hash == 'detail') {
    			if (routes[i] == 'detail') {
    				elem.classList.add('show');
					elem.classList.remove('hide');
    			};
    			el.screens.classList.add('hide');
				el.screens.classList.remove('show');
    		} else {
    			el.screens.classList.add('show');
				el.screens.classList.remove('hide');
    		};
    	};
	};
	// Return public functions
	return {
		init: init,
		loading: loading
	};
}());