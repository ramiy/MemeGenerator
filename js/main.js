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
	createMemes();
}

function createMemes() {
	createMeme('img/meme1.jpg', ['happy']);
	createMeme('img/leo.jpg', ['happy']);
	createMeme('img/putin.jpg', ['sarcastic']);
	createMeme('img/trump.jpg', ['crazy', 'sarcastic']);
	createMeme('img/dogs.jpg', ['happy']);
	createMeme('img/dogs.jpg', ['happy']);
	createMeme('img/dogs.jpg', ['happy']);
	createMeme('img/dogs.jpg', ['happy']);
	createMeme('img/dogs.jpg', ['happy']);
	createMeme('img/dogs.jpg', ['happy']);
}

function createMeme(imgUrl, keywords) {
	var meme = {
		id: makeId(),
		url: imgUrl,
		keywords: keywords
	}

	// update modal
	gImgs.push(meme);

	// render memes
	renderMemes();
}

// Render memes on screen
function renderMemes() {
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