'use strict';

var gImgs = []; // An object with: id, url, keywords
var gMeme = {
	selectedImgId: 5,
	txts: [
		{
			line: 'I never eat Falafel',
			size: 20,
			align: 'left',
			color: 'red'
		}
	]
}



// Initialize the app
function init() {
	// Create initial images
	createImages();

	// Images keywords
	renderKeywords();

	// Render images grid
	renderImages();
}



/*************** IMAGES ***************/

// Create initial images
function createImages() {
	createImage('img/2.jpg', ['happy']);
	createImage('img/003.jpg', ['crazy', 'sarcastic']);
	createImage('img/004.jpg', ['happy', 'animal']);
	createImage('img/005.jpg', ['kids', 'calm', 'slip', 'animal']);
	createImage('img/5.jpg', ['sarcastic', 'kids']);
	createImage('img/006.jpg', ['animal', 'calm']);
	createImage('img/8.jpg', ['happy']);
	createImage('img/9.jpg', ['crazy', 'sarcastic']);
	createImage('img/12.jpg', ['crazy']);
	createImage('img/19.jpg', ['crazy', 'sarcastic']);
	createImage('img/Ancient-Aliens.jpg', ['sarcastic']);
	createImage('img/drevil.jpg', ['crazy', 'sarcastic']);
	createImage('img/img2.jpg', ['happy', 'kids']);
	createImage('img/img4.jpg', ['crazy', 'sarcastic']);
	createImage('img/img5.jpg', ['kids']);
	createImage('img/img6.jpg', ['animal']);
	createImage('img/img11.jpg', ['happy']);
	createImage('img/img12.jpg', ['sad']);
	createImage('img/leo.jpg', ['happy']);
	createImage('img/meme1.jpg', ['sarcastic']);
	createImage('img/One-Does-Not-Simply.jpg', ['happy']);
	createImage('img/Oprah-You-Get-A.jpg', ['happy', 'crazy']);
	createImage('img/patrick.jpg', ['happy']);
	createImage('img/putin.jpg', ['sarcastic', 'crazy']);
	createImage('img/X-Everywhere.jpg', ['happy', 'kids', 'toys']);
}

// Add image to the images model
function createImage(imgUrl, keywords) {
	var image = {
		id: makeId(),
		url: imgUrl,
		keywords: keywords
	}
	gImgs.push(image);
}

// Render images grid on screen
function renderImages() {
	var srtHTML = '';
	gImgs.forEach(function (image) {
		srtHTML += `
		<li class="hex">
			<div class="hexIn">
				<div class="hexLink">
					<img src="${image.url}" alt="" onclick="placeImgToCanvas(this); " />
				</div>
			</div>
		</li>`;
	});

	// Update images on screen
	var elImages = document.querySelector('.images');
	elImages.innerHTML = srtHTML;
}

// Render keywords on screen
function renderKeywords() {
	var keywords = [];
	gImgs.forEach(function (img) {
		keywords.push(img.keywords);
	});

	// Sort keywords
	keywords = flattenArray(keywords);
	keywords = sortArrayByOccurrences(keywords);
	console.log(keywords);

	// Create keywords HTML
	var srtHTML = '';
	for (var keyword in keywords) {
        srtHTML += `<option value="${keyword}"></option>`;
    }

	// Update keywords data list on screen
	var elKeywordsDataList = document.querySelector('#keywords');
	elKeywordsDataList.innerHTML = srtHTML;
}


/*************** CANVAS ***************/

// Draw image to canvas
function placeImgToCanvas(el) {
	var elCanvas = document.querySelector('.meme-canvas');
	var ctx = elCanvas.getContext('2d');

	ctx.drawImage(el, 0, 0);

	//Adjust canvas container to image size


}