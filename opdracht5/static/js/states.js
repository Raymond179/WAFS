// Router object
var states = (function() {
	// Declare all routes
	var routes = ['search', 'watchlist', 'detail']
	var init = function() {
		// Fire router function on hash change and on refresh
		window.addEventListener("hashchange", router.bind(this), false);
		window.addEventListener("load", router.bind(this), false);

		// Fire swipe function
		swipe();
	}
	var swipe = function() {
		// Make new hammer
		var mc = new Hammer(el.screens);
		// Set pan to horizontal direction and threshold to 100px
		mc.add( new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL, threshold: 100}));

		// When swipe left, set hash to watchlist
		mc.on("panleft", function(ev) {
			location.hash = 'watchlist';
		});

		// When swipe right, set hash to search
		mc.on("panright", function(ev) {
			location.hash = 'search';
		});
	}
	var router = function() {
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
    				elem.style.display = 'none';
    			}
    		} else {
    			if (routes[i] != 'detail') {
    				active.parentElement.classList.add('active-menu-button');
    				el.screens.classList.add(routes[i]);
    			} else {
    				elem.style.display = '';
    			}
    		};

    		// If the hash is detail, display the detail screen and hide the other screens
    		if (hash == 'detail') {
    			if (routes[i] == 'detail') {
    				elem.style.display = '';
    			};
    			el.screens.style.display = 'none';
    		} else {
    			el.screens.style.display = '';
    		}
    	}
	}
	// Return public functions
	return {
		init: init
	}
}());