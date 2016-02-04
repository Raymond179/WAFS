(function() {
	var app = {
		init: function() {
			routes.init();
		}
	};

	var routes = {
		init: function() {

			// haschanged event listener
			// kijkt naar de hash, in de url, als hij die ziet dan voert hij een functie uit
			window.addEventListener('hashchange', sections.toggle ,false);
			// also check the page on load voer dan ook een functie uit
			window.addEventListener('load', sections.toggle ,false);

		}
	};

	var sections = {
		toggle: function() {

			// Get the hash of the current url after click
			//  pak de has uit de url en sla op in variable url
			var url = window.location.hash;

			// als er een url is pak dan de 
			if ( url ) {

				//NOTE: Got the templateing idea from Dylan Vens

				// pak uit de html het template dat de url matched 
				var matchingTemplate = document.querySelector(url);

				// If this templates exists
				if ( matchingTemplate ) {

					// Get the content from the matching template and use that content in the main html
					main.innerHTML = matchingTemplate.innerHTML;

				} else {

					// If the template doesn't exists: load the error template
					main.innerHTML = document.querySelector('#error').innerHTML;

				}

			} else {
				
				// If the url has no hash(so this is home) -> set the hash to start
				window.location.hash = '#home';

			} 

		}
	};

	app.init();
})();
