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
	gImgs.forEach(function( meme ){
		srtHTML += `<li><img src="${meme.url}"></li>`;
	});

	// Update screen
	var elMemes = document.querySelector('.memes');
	elMemes.innerHTML = srtHTML
}