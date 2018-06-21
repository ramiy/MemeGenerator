'use strict';

// Initialize the app
function init() {

	// Add initial images
	addImages();

	// Render images keywords
	renderKeywords();

	// Render images grid
	renderGallery();

	// Load initial meme data
	loadMemeData();

	// Show gallery screen, hide canvas
	showGallery()
}



/*************** SCREENS ***************/

// Show gallery screen
function showGallery() {
	hideElement('.canvas-section');
	showElement('.gallery-section');
}

// Show gallery screen
function showCanvas() {
	hideElement('.gallery-section');
	showElement('.canvas-section');
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
	document.querySelector('.txt-field').value = getMemeText();
	document.querySelector('.select-font').value = getMemeFont();
	document.querySelector('.select-color').value = getMemeColor();
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
}

// Download the image
function downloadImage(elLink) {
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');

	var imgContent = elCanvas.toDataURL('image/jpeg');
	elLink.href = imgContent
}

// Draw image to canvas
function placeImgToCanvas(elImg, imgId) {
	updateMemeImage(elImg);
	renderCanvas(elImg);
	showCanvas();
}

function updateCanvas() {
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');
	ctx.clearRect(0, 0, 500, 550);

	placeImgToCanvas(getMemeImage());

	ctx.font = `${getMemeSize()}px ${getMemeFont()}`;
	ctx.fillStyle = getMemeColor();
	ctx.fillText(getMemeText(), getMemePositionX(), getMemePositionY());
}

// On change meme text
function onChangeText(text) {
	console.log( text );
	updateMemeText(text);
	updateCanvas();
	console.log( gMeme );
}

// On change meme font
function onChangeFont(font) {
	updateMemeFont(font);
	updateCanvas();
}

// On change meme color
function onChangeColor(color) {
	updateMemeColor(color);
	updateCanvas();
}

// On font size increase
function onSizeIncrease() {
	updateMemeSize(10);
	updateCanvas();
}

// On font size decrease
function onSizeDecrease() {
	updateMemeSize(-10);
	updateCanvas();
}

// On move up
function moveUp() {
	updateMemePositionY(-10);
	updateCanvas();
}

// On move right
function moveRight() {
	updateMemePositionX(+10);
	updateCanvas();
}

// On move down
function moveDown() {
	updateMemePositionY(10);
	updateCanvas();
}

// On move left
function moveLeft() {
	updateMemePositionX(-10);
	updateCanvas();
}

function handleKeyPress(ev) {
	console.log(ev.key);
	switch (ev.key) {
		case '+':
			onSizeIncrease();
			break;
		case '-':
			onSizeDecrease();
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


