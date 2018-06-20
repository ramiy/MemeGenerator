'use strict';

var gImages = []; // { id: '', url: '', keywords: '' }
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
var gTxtPosition; // Is used for function that types a text on the image



// Initialize the app
function init() {
	// Add initial images
	addImages();

	// Render images keywords
	renderKeywords();

	// Render images grid
	renderImages();

	// Hide canvas, show gallery
	hideElement('.canvas-section');
	showElement('.gallery-section');
}



/*************** IMAGES ***************/

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

// Add a single image and add it to the images model
function addImage(imgUrl, keywords) {
	gImages.push(createImage(imgUrl, keywords));
}

// Create a single image object
function createImage(imgUrl, keywords) {
	return {
		id: makeId(),
		url: imgUrl,
		keywords: keywords
	}
}

// Render images grid on screen
function renderImages() {

	// Retrieve filter parameter
	var elKeywordsFilter = document.querySelector('#filter');
	var filterBy = elKeywordsFilter.value;

	// Filter images
	var filteredImages = gImages.filter(function (image) {
		return (image.keywords).join().includes(filterBy);
	});

	// Create images HTML
	var srtHTML = '';
	filteredImages.forEach(function (image) {
		srtHTML += `
		<li class="hex">
			<div class="hexIn">
				<div class="hexLink">
					<img src="${image.url}" alt="" onclick="placeImgToCanvas(this)" />
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
	gImages.forEach(function (img) {
		keywords.push(img.keywords);
	});

	// Sort keywords
	keywords = flattenArray(keywords);
	keywords = sortArrayByOccurrences(keywords);

	// Create keywords HTML
	var srtHTML = '';
	for (var i = 0; i < keywords.length; i++) {
		srtHTML += `<option value="${keywords[i][0]}">${keywords[i][0]}</option>`;
	}

	// Update keywords data list on screen
	var elKeywordsDataList = document.querySelector('#keywords');
	elKeywordsDataList.innerHTML = srtHTML;
}



/*************** CANVAS ***************/

// Back to gallery - hide 
function backToGallery() {
	// Hide canvas, show gallery
	hideElement('.canvas-section');
	showElement('.gallery-section');
}

// Draw image to canvas
function placeImgToCanvas(elImg) {
	var elCanvas = document.querySelector('.meme-canvas');
	var ctx = elCanvas.getContext('2d');
	/* context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);  */
	ctx.drawImage(elImg, 0, 0, 500, 500);

	// Hide gallery, show canvas
	hideElement('.gallery-section');
	showElement('.canvas-section');
}

// When "add Text To Image" button is pressed
function addTxtToImg(el) {
	el.classList.add('display-none');
	var elImgTxtInputField = document.querySelector('.input-txt');
	elImgTxtInputField.classList.remove('display-none');
}

/*
function activateTypeOnImg() {
	
}
*/

//The typing on the image
function typeOnImg() {
	var elCanvas = document.querySelector('.meme-canvas');
	var ctx = elCanvas.getContext('2d');
	ctx.font = "30px Arial";
	ctx.fillStyle = "white";

	var elTxtField = document.querySelector('.txt-field');
	elTxtField.onkeyup = function () {
		ctx.strokeText(elTxtField.value, 80, 80);
	}
}

/*

<script>
document.getElementById("fname").onkeyup = function() {myFunction()};

function myFunction() {
    var x = document.getElementById("fname");
    x.value = x.value.toUpperCase();
}
</script>

*/
