'use strict';

var gKeywords = [];



// Retrieve the keywords model
function getKeywords() {
	return gKeywords;
}

// Set images keywords
function setKeywords() {
	// Retrieve all the keywords in the gallery
	var gallery = getGallery();
	var keywords = gallery.map(function (img) {
		return img.keywords;
	});

	// Sort the keywords
	keywords = flattenArray(keywords);
	keywords = sortArrayByOccurrences(keywords);

	// Set global keywords
	gKeywords = keywords;
}

// Set initial keywords search
function setInitSearches() {
	// Check if searches exist in the local storage
	var searches = loadFromStorage('MemeGeneratorSearch');
	if (searches) return;

	// if not, set initial search keywords
	var initialSearches = [
		['happy', 5],
		['animal', 1],
		['crazy', 2],
		['sarcastic', 3],
		['toys', 1]
	];
	saveToStorage('MemeGeneratorSearch', initialSearches);
}

// Add keyword to the searches
function addSearchKeyword(searches, keyword) {

	// Check if the keyword exist in the searches
	var searchExist = searches.some(function (search) {
		return search[0] === keyword;
	});

	// Add keyword
	if (searchExist) {

		// Increase count
		searches.map(function (item) {
			var count = (item[0] === keyword) ? item[1]++ : item[1];
			return [item[0], count];
		});

	} else {

		// Add new
		searches.push([keyword, 1]);

	}

	return searches;
}
