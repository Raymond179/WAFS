// Object where elements are declared
var el = (function() {
	var init = function() {
		this.screens = document.getElementById('screens');
		this.searchScreen = document.getElementById('search');
		this.watchlistScreen = document.getElementById('watchlist');
		this.detailScreen = document.getElementById('detail_container');
		this.navSearch = document.getElementById('nav-search');
		this.navWatchlist = document.getElementById('nav-watchlist');
		this.list = document.getElementById('list');
		this.listWatchlist = document.getElementById('list-watchlist');
		this.form = document.getElementById('form');
		this.submitButton = document.getElementById('submit');
		this.searchvalue = document.getElementById('searchvalue');
		this.firstLih1 = document.querySelector('#list li:first-child h1');
		this.loading = document.querySelectorAll('.loading');
	}
	// Return public functions
	return {
		init: init
	}
}());