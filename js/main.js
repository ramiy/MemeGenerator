'use strict';

// Initialize the app
function init() {

	// Add initial images
	addImages();

	// Set images keywords
	setKeywords();

	// Set initial keywords search
	setInitSearches();

	// Render keywords on screen
	renderKeywords();

	// Render gallery grid on screen
	renderGallery();

	// Load initial meme data
	loadMemeData();

	// Show gallery screen, hide canvas
	showGallery();
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
					<img src="${image.url}" alt="" onclick="onChangeMemeImage(this); showCanvas();" />
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
	var keywords = getKeywords();
	var srtHTML = '';
	for (let i = 0; i < keywords.length; i++) {
		var keyword = keywords[i];
		srtHTML += `<option value="${keyword[0]}">${keyword[0]}</option>`;
	}

	// Update keywords data list on screen
	var elKeywordsDataList = document.querySelector('#keywords');
	elKeywordsDataList.innerHTML = srtHTML;
}

// When searching by keywords, save search results
function onSearch(search) {
	// Get all available keywords
	var keywords = getKeywords();

	// Check if the search equals to one of the keywords
	var keywordExist = keywords.some(function (keyword) {
		return keyword[0] === search;
	});

	// Save search to local storage
	if (keywordExist) {
		var searches = loadFromStorage('MemeGeneratorSearch');
		searches = addSearchKeyword( searches, search );
		saveToStorage('MemeGeneratorSearch', searches);
	}

	renderGallery();
}



/*************** CANVAS ***************/

// Retrieve the canvas element
function getCanvas() {
	var elCanvas = document.querySelector('.meme-canvas');
	return elCanvas;
}

// Render canvas
function renderCanvas(img) {
	var elCanvas = getCanvas();
	var ctx = elCanvas.getContext('2d');

	// If no image uploaded, use meme image
	if (!img) img = getMemeImage();

	// Clean board
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, ctx.elCanvas, elCanvas.height);

	// Print Image
	ctx.drawImage(img, 0, 0, 500, 500);

	// Print text
	ctx.font = `${getMemeSize()}px ${getMemeFont()}`;
	ctx.fillStyle = getMemeColor();
	ctx.fillText(getMemeText(), getMemePositionX(), getMemePositionY());
}



/*************** MEME ***************/

// Load initial meme data from the model and render it on screen
function loadMemeData() {
	document.querySelector('.meme-text').value = getMemeText();
	document.querySelector('.meme-font').value = getMemeFont();
	document.querySelector('.meme-color').value = getMemeColor();
}

// On upload meme image
function onUploadMemeImage(ev) {
	var reader = new FileReader();
	reader.onload = function (event) {
		var img = new Image();
		img.onload = renderCanvas.bind(null, img)
		img.src = event.target.result;
	}
	reader.readAsDataURL(ev.target.files[0]);
}

// On change meme image (from the gallery)
function onChangeMemeImage(elImg) {
	updateMemeImage(elImg);
	renderCanvas();
}

// On change meme text
function onChangeMemeText(text) {
	updateMemeText(text);
	renderCanvas();
}

// On change meme font
function onChangeMemeFont(font) {
	updateMemeFont(font);
	renderCanvas();
}

// On change meme color
function onChangeMemeColor(color) {
	updateMemeColor(color);
	renderCanvas();
}

// On meme font size increase
function onMemeSizeIncrease() {
	updateMemeSize(5);
	renderCanvas();
}

// On meme font size decrease
function onMemeSizeDecrease() {
	updateMemeSize(-5);
	renderCanvas();
}

// On move up
function moveUp() {
	updateMemePositionY(-5);
	renderCanvas();
}

// On move right
function moveRight() {
	updateMemePositionX(+5);
	renderCanvas();
}

// On move down
function moveDown() {
	updateMemePositionY(10);
	renderCanvas();
}

// On move left
function moveLeft() {
	updateMemePositionX(-10);
	renderCanvas();
}

// Handle keyboards clicks
function handleKeyPress(ev) {
	console.log(ev.key);
	switch (ev.key) {
		case '+':
			onMemeSizeIncrease();
			break;
		case '-':
			onMemeSizeDecrease();
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

// Download the image
function downloadImage(elLink) {
	var elCanvas = getCanvas();
	var imgContent = elCanvas.toDataURL('image/jpeg');
	elLink.href = imgContent;
}
