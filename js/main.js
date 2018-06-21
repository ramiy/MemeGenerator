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

var gTxtPosition; // Is used for function that types a text on the image (not sure we need that..)
var gCurrImg;

var gColor = 'white';
var gFont;
var gTxtStr;
var gFontSize = 50;




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
	for (var keyword in keywords) {
		srtHTML += `<option value="${keyword}"></option>`;
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

// Retrieve the canvas element
function getCanvas() {
	var elCanvas = document.querySelector('.meme-canvas');
	return elCanvas;
}

// Render canvas
function renderCanvas(img) {
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	/* context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);  */
	ctx.drawImage(img, 0, 0, 500, 500);
}

// 
function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

// 
function handleImageFromInput(ev, onImageReady) {
	ev.preventDefault();

    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

// Download the image
function downloadImage(elLink) {
	var elCanvas = getCanvas();
    var imgContent = elCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

// Draw image to canvas
function placeImgToCanvas(elImg) {
	gCurrImg = elImg;

	// Render canvas
	renderCanvas(elImg);

	// Hide gallery, show canvas
	hideElement('.gallery-section');
	showElement('.canvas-section');
}

//The typing on the image
function typeOnImg() {
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;

	var elTxtField = document.querySelector('.txt-field');

	elTxtField.onkeyup = function (ev) {
		if (ev.key === 'Backspace') {
			ctx.clearRect(0, 0, 500, 550);
			placeImgToCanvas(gCurrImg);
            // copy from 5 first lines of typeOnImg(), to avoid recursion
			elCanvas = getCanvas();
			ctx = elCanvas.getContext('2d');
			ctx.font = `${gFontSize}px ${gFont}`;
			ctx.fillStyle = gColor;
			elTxtField = document.querySelector('.txt-field');

			ctx.fillText(elTxtField.value, 70, elCanvas.height / 3);

		} else { 
			ctx.fillText(elTxtField.value, 70, elCanvas.height / 3);
			console.log(ev.key, elTxtField.value);
		}
	}
}


//Text adjustment functions
function changeFont(elFont) {
	gFont = elFont.value;	
	
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');

	
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, 70, elCanvas.height / 3);
	
	
	
}

function changeColor(elColor) {
	gColor = elColor.value;

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');

	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	typeOnImg();
}

function fontSizeUp() {
	gFontSize += 10; 

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');

	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	typeOnImg();
}

function fontSizeDown() {
	gFontSize -= 10;

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');

	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	typeOnImg();
}

function moveUp() {

}

function moveRight() {

}

function moveDown() {

}

function moveLeft() {

}


