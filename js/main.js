'use strict';

// Initialize the app
function init() {

	// Add initial images
	addImages();

	// Set images keywords
	setKeywords();

	// Set initial popular searches
	setInitPopularSearches();

	// Render popular searches on screen
	renderSearches();

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
	var strHTML = '';
	filteredImages.forEach(function (image) {
		strHTML += `
		<li class="hex">
			<div class="hexIn">
				<div class="hexLink">
					<img src="${image.url}" alt="" onclick="onChangeMemeImage('${image.id}'); showCanvas();" />
				</div>
			</div>
		</li>`;
	});

	// Update gallery on screen
	var elImages = document.querySelector('.images');
	elImages.innerHTML = strHTML;
}

// Render keywords on screen
function renderKeywords() {
	var keywords = getKeywords();
	var strHTML = '';
	for (var i = 0; i < keywords.length; i++) {
		var keyword = keywords[i];
		strHTML += `<option value="${keyword[0]}">${keyword[0]}</option>`;
	}

	// Update keywords data list on screen
	var elKeywordsDataList = document.querySelector('#keywords');
	elKeywordsDataList.innerHTML = strHTML;
}

// Render popular searches on screen
function renderSearches() {
	var items = getPopularSearches();
	var lowVal = Number.MAX_VALUE;
	var highVal = 0;
	var minSize = 15;
	var maxSize = 60;

	for (var i = 0; i < items.length; i++) {
		var data = parseInt(items[i][1], 10);
		if (data > highVal) highVal = data;
		if (data < lowVal) lowVal = data;
	}

	var spreadSize = maxSize - minSize;
	var spread = highVal - lowVal;

	var strHTML = '';
	for (i = 0; i < items.length; i++) {
		data = parseInt(items[i][1], 10);
		var size = (spreadSize * (data - lowVal) / spread) + minSize;
		size = Math.round(size);
		var keyword = items[i][0];
		strHTML += `<li><span role="button" style="font-size: ${size}px" onclick="onSelectSearch('${keyword}')">${keyword}</span></li>`;
	}

	// Update popular searches on screen
	var elSearches = document.querySelector('.searches');
	elSearches.innerHTML = strHTML;
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
		var searches = getPopularSearches();
		searches = addPopularSearches(searches, search);
		saveToStorage(getStorageKey(), searches);
	}

	renderSearches()
	renderGallery();
}

// When selecting a popular search
function onSelectSearch(keyword) {
	document.querySelector('#filter').value = keyword;
	onSearch(keyword);
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
	var imgObj = getImage( img );
	ctx.drawImage(imgObj.url, 0, 0, 500, 500);

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
