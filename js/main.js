'use strict';


var gMeme = {
	selectedImgId: 5,
	txts: [
		{
			line: 'I never eat Falafel with arie',
			font: 'arial',
			color: 'blue',
			size: 20
		}
	]
}
var gCurrImg;
var gColor = 'white';
var gFont;
var gTxtStr;
var gFontSize = 50;
var gX = 70;
var gY = 100;



// Initialize the app
function init() {
	// Add initial images
	addImages();

	// Load initial meme data
	loadMemeData();

	// Render images keywords
	renderKeywords();

	// Render images grid
	renderGallery();

	// Hide canvas, show gallery
	hideElement('.canvas-section');
	showElement('.gallery-section');
}



/*************** GALLERY ***************/

// Render gallery grid on screen
function renderGallery() {

	// Retrieve filter parameter
	var elKeywordsFilter = document.querySelector('#filter');
	var filterBy = elKeywordsFilter.value;

	// Filter images
	var gallery = getGallery();
	var filteredImages = gallery.filter(function (image) {
		return (image.keywords).join().includes(filterBy);
	});

	// Create HTML for each image
	var srtHTML = '';
	filteredImages.forEach(function (image) {
		srtHTML += `
		<li class="hex">
			<div class="hexIn">
				<div class="hexLink">
					<img src="${image.url}" alt="" onclick="placeImgToCanvas(this, '${image.id}')" />
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
	// Retrieve all the keywords in the gallery
	var gallery = getGallery();
	var keywords = gallery.map(function (img) {
		return img.keywords;
	});

	// Sort the keywords
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

// Load initial meme data from the model and render it on screen
function loadMemeData() {
	document.querySelector('.txt-field').value = gMeme.txts[0].line;
	document.querySelector('.select-font').value = gMeme.txts[0].font;
	document.querySelector('.select-color').value = gMeme.txts[0].color;
}

// Go back to gallery
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
function renderCanvas(elImg) {
	// Retrieve canvas element
	var elCanvas = getCanvas();

	// Update canvas
	var ctx = elCanvas.getContext('2d');

	// Clean board
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, ctx.elCanvas, elCanvas.height);

	// Print Image
	ctx.drawImage(elImg, 0, 0, 500, 500);

	// Print text
	ctx.font = `${gMeme.txts[0].size}px ${gMeme.txts[0].font}`;
	ctx.fillStyle = gMeme.txts[0].color;
	ctx.strokeText(gMeme.txts[0].line, 10, 50);

	// gMeme.selectedImgId

	// /**/
	// ctx.fillStyle = gColor;

	// var elTxtField = document.querySelector('.txt-field');

	// elTxtField.onkeyup = function (ev) {
	// 	if (ev.key === 'Backspace') {
	// 		ctx.clearRect(0, 0, 500, 550);
	// 		placeImgToCanvas(gCurrImg);
	// 		// copy from 5 first lines of typeOnImg(), to avoid recursion
	// 		elCanvas = getCanvas();
	// 		ctx = elCanvas.getContext('2d');
	// 		ctx.font = `${gFontSize}px ${gFont}`;
	// 		ctx.fillStyle = gColor;
	// 		elTxtField = document.querySelector('.txt-field');

	// 		ctx.fillText(elTxtField.value, 70, elCanvas.height / 3);
	// 	} else {
	// 		ctx.fillText(elTxtField.value, 70, elCanvas.height / 3);
	// 		console.log(ev.key, elTxtField.value);
	// 	}
	// }
}

// Retrieve meme modal
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

// Download the image
function downloadImage(elLink) {
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');

	var imgContent = elCanvas.toDataURL('image/jpeg');
	elLink.href = imgContent
}

// Draw image to canvas
function placeImgToCanvas(elImg, imgId) {
	// Update global image
	gCurrImg = elImg;

	// Update meme modal image ID
	gMeme.selectedImgId = imgId;

	// Render canvas
	renderCanvas(elImg);

	// Hide gallery, show canvas
	hideElement('.gallery-section');
	showElement('.canvas-section');
}

// The typing on the image
function typeOnImg() {
	// Update meme modal text font
	gMeme.txts[0].line = document.querySelector('.txt-field').value;
	console.log(gMeme);

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

			ctx.fillText(elTxtField.value, gX, gY);

		} else {
			ctx.fillText(elTxtField.value, gX, gY);
			console.log(ev.key, elTxtField.value);
		}
	}
}


// Text adjustment functions
function changeFont(font) {
	// Update global font
	gFont = font;

	// Update meme modal text font
	gMeme.txts[0].line = font;

	// Update canvas
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, gX, gY);
}

function changeColor(color) {
	// Update global color
	gColor = color;

	// Update meme modal text color
	gMeme.txts[0].color = color;

	// Update canvas
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, gX, gY);
}

function fontSizeUp() {
	// Update global size
	gFontSize += 10;

	// Update meme modal text size
	gMeme.txts[0].size += 10;

	// Update canvas
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, gX, gY);
}

function fontSizeDown() {
	// Update global size
	gFontSize -= 10;

	// Update meme modal text size
	gMeme.txts[0].size -= 10;

	// Update canvas
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, gX, gY);
}

function moveUp() {
	gY -= 10;

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, gX, gY);

}

function moveRight() {
	gX += 10;

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, gX, gY);


}

function moveDown() {
	gY += 10;

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, gX, gY);

}

function moveLeft() {
	console.log('decreasing font');
	gX -= 10

	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);
	placeImgToCanvas(gCurrImg);
	ctx.font = `${gFontSize}px ${gFont}`;
	ctx.fillStyle = gColor;
	var elTxtField = document.querySelector('.txt-field');
	ctx.fillText(elTxtField.value, gX, gY);

}

function handleKeyPress(ev) {
	console.log(ev.key);
	switch (ev.key) {
		case '+':
			fontSizeUp();
			break;
		case '-':
			fontSizeDown();
			break;
		case 'ArrowUp':
			moveUp();
			break;
		case 'ArrowRight':
			moveRight();
			break;
		case 'ArrowDown':
			moveDown();
			break;
		case 'ArrowLeft':
			moveLeft();
			break;
	}
}


