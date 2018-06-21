'use strict';

var gGallery = []; // { id: '', url: '', keywords: '' }
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
var gCurrImg;
var gColor;
var gFont;
var gTxtStr;



// Initialize the app
function init() {
	// Add initial images
	addImages();

	// Render images keywords
	renderKeywords();

	// Render images grid
	renderGallery();

	// Hide canvas, show gallery
	hideElement('.canvas-section');
	showElement('.gallery-section');
}



/*************** GALLERY ***************/

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

// Render gallery grid on screen
function renderGallery() {

	// Retrieve filter parameter
	var elKeywordsFilter = document.querySelector('#filter');
	var filterBy = elKeywordsFilter.value;

	// Filter images
	var filteredImages = gGallery.filter(function (image) {
		return (image.keywords).join().includes(filterBy);
	});

	// Create HTML for each image
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

	// Update gallery on screen
	var elImages = document.querySelector('.images');
	elImages.innerHTML = srtHTML;
}

// Render keywords on screen
function renderKeywords() {
	var keywords = [];
	gGallery.forEach(function (img) {
		keywords.push(img.keywords);
	});

	// Sort keywords
	keywords = flattenArray(keywords);
	keywords = sortArrayByOccurrences(keywords);

	// Create keywords HTML
	var srtHTML = '';
	for (let i = 0; i < keywords.length; i++) {
		var keyword = keywords[i];
		srtHTML += `<option value="${keyword[0]}">${keyword[0]}</option>`;
	}

	// Update keywords data list on screen
	var elKeywordsDataList = document.querySelector('#keywords');
	elKeywordsDataList.innerHTML = srtHTML;
}



/*************** MEME ***************/

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

	// Update can
	var ctx = elCanvas.getContext('2d');
	ctx.font = `40px ${gFont}`;
	ctx.fillStyle = "white";


	ctx.drawImage(img, 0, 0, 500, 500);

}

// Retrieve meme modal
function getMeme() {
	return gMeme;
}

// retrieve meme
function getMeme() {
	return gMeme;
}

// // 
// function onFileInputChange(ev) {
//     handleImageFromInput(ev, renderCanvas)
// }

// // 
// function handleImageFromInput(ev, onImageReady) {
// 	ev.preventDefault();

//     document.querySelector('.share-container').innerHTML = ''
//     var reader = new FileReader();

//     reader.onload = function (event) {
//         var img = new Image();
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result;
//     }
//     reader.readAsDataURL(ev.target.files[0]);
// }

// // Download the image
// function downloadImage(elLink) {
// 	var elCanvas = getCanvas();
//     var imgContent = elCanvas.toDataURL('image/jpeg');
//     elLink.href = imgContent
// }

// Draw image to canvas
function placeImgToCanvas(elImg) {
	gCurrImg = elImg;

	// Render canvas
	renderCanvas(elImg);

	// Hide gallery, show canvas
	hideElement('.gallery-section');
	showElement('.canvas-section');
}

// The typing on the image
function typeOnImg() {
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.font = `40px ${gFont}`;
	ctx.fillStyle = "white";

	var elTxtField = document.querySelector('.txt-field');

	elTxtField.onkeyup = function (ev) {
		if (ev.key === 'Backspace') {
			ctx.clearRect(0, 0, 500, 550);
			placeImgToCanvas(gCurrImg);
            // copy from 5 first lines of typeOnImg(), to avoid recursion
			elCanvas = getCanvas();
			ctx = elCanvas.getContext('2d');
			ctx.font = `40px ${gFont}`;
			ctx.fillStyle = "white";
			elTxtField = document.querySelector('.txt-field');

			ctx.fillText(elTxtField.value, 70, elCanvas.height / 3);

		} else { 
			ctx.fillText(elTxtField.value, 70, elCanvas.height / 3);
			console.log(ev.key, elTxtField.value);
		}
	}
}


// Text adjustment functions
function changeFont(elFont) {
	gFont = elFont.value;	

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');

	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	typeOnImg();
}

function changeColor() {

}

function fontSizeUp() {

}

function fontSizeDown() {

}

function moveUp() {

}

function moveRight() {

}

function moveDown() {

}

function moveLeft() {

}


