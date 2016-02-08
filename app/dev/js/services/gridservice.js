'use strict'

module.exports = function ($http) {

	//Fetch photos from Flickr API
	this.getPhotos = function (searchstring) {
		var query = searchstring;
		var sort = "relevance"
		var quantity = 18;
		var page = 1;
		var api_key = "c58e885eb03c2849fae21f69238c7437";		
		return $http.jsonp('https://api.flickr.com/services/rest/?text=' + query + '&sort=' + sort + '&per_page=' + quantity + '&jsoncallback=JSON_CALLBACK&result&page=1&method=flickr.photos.search&api_key=' + api_key + '&format=json');

	}

};
