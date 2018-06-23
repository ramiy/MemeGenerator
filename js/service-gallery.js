'use strict';

var gGallery = []; // An array of objects: { id: '', url: '', keywords: '' }



// Retrieve the gallery model
function getGallery() {
	return gGallery;
}

// Add initial images to the images model
function addImages() {
	addImage('img/2.jpg', ['happy']);
	addImage('img/003.jpg', ['crazy', 'sarcastic']);
	addImage('img/004.jpg', ['happy', 'animal']);
	addImage('img/005.jpg', ['kids', 'calm', 'slip', 'animal']);
	addImage('img/5.jpg', ['sarcastic', 'kids']);
	addImage('img/006.jpg', ['animal', 'calm']);
	addImage('img/8.jpg', ['happy']);
	addImage('img/9.jpg', ['crazy', 'sarcastic']);
	addImage('img/12.jpg', ['crazy']);
	addImage('img/19.jpg', ['crazy', 'sarcastic']);
	addImage('img/Ancient-Aliens.jpg', ['sarcastic']);
	addImage('img/drevil.jpg', ['crazy', 'sarcastic']);
	addImage('img/img2.jpg', ['happy', 'kids']);
	addImage('img/img4.jpg', ['crazy', 'sarcastic']);
	addImage('img/img5.jpg', ['kids']);
	addImage('img/img6.jpg', ['animal']);
	addImage('img/img11.jpg', ['happy']);
	addImage('img/img12.jpg', ['sad']);
	addImage('img/leo.jpg', ['happy']);
	addImage('img/meme1.jpg', ['sarcastic']);
	addImage('img/One-Does-Not-Simply.jpg', ['happy']);
	addImage('img/Oprah-You-Get-A.jpg', ['happy', 'crazy']);
	addImage('img/patrick.jpg', ['happy']);
	addImage('img/putin.jpg', ['sarcastic', 'crazy']);
	addImage('img/X-Everywhere.jpg', ['happy', 'kids', 'toys']);
}

// Add a single image to the images model
function addImage(imgUrl, keywords) {
	gGallery.push(createImage(imgUrl, keywords));
}

// Create a single image object
function createImage(imgUrl, keywords) {
	return {
		id: makeId(),
		url: imgUrl,
		keywords: keywords
	}
}

// Retrieve an image by image id
function getImage( imgId ) {
	return gGallery.filter(function (image) {
		return image.id === imgId;
	});
}
