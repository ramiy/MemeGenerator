'use strict';

var gImgs = [];
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

	// Render images grid
	renderImages();
}

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

// add image to the images model
function createImage(imgUrl, keywords) {
	var meme = {
		id: makeId(),
		url: imgUrl,
		keywords: keywords
	}

	// update modal
	gImgs.push(meme);
}

// Render images grid on screen
function renderImages() {
	// Render images
	var srtHTML = '';
	gImgs.forEach(function (meme) {
		srtHTML += `
		<li class="hex">
			<div class="hexIn">
				<a class="hexLink" href="#">
					<img src="${meme.url}" alt="" onclick="placeImgToCanvas(this); " />
				</a>
			</div>
		</li>`;
	});

	// Update screen
	var elMemes = document.querySelector('.memes');
	elMemes.innerHTML = srtHTML
}

// Draw image to canvas

function placeImgToCanvas(el) {
	var elCanvas = document.querySelector('.meme-canvas');
	var ctx = elCanvas.getContext('2d');

	ctx.drawImage(el, 0, 0);

	//Adjust canvas container to image size


}