'use strict';

var gImgs = []; // An object with: id, url, keywords
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

var gTxtPosition;   // Is used for function that types a text on the image



// Initialize the app
function init() {
	// Create initial images
	createImages();

	// Render images grid
	renderImages();
}



/*************** IMAGES ***************/

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

// Add image to the images model
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
				<div class="hexLink">
					<img src="${meme.url}" alt="" onclick="placeImgToCanvas(this); " />
				</div>
			</div>
		</li>`;
	});

	// Update images on screen
	var elImages = document.querySelector('.images');
	elImages.innerHTML = srtHTML
}



/*************** CANVAS ***************/

// Draw image to canvas
function placeImgToCanvas(el) {
	var elCanvas = document.querySelector('.meme-canvas');
	var ctx = elCanvas.getContext('2d');
	var elImg = el; 
	/* context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);  */
	ctx.drawImage(elImg, 0, 0, 500, 500);
}


//When "add Text To Image" button is pressed
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
	elTxtField.onkeyup = function() {
		
		ctx.strokeText(elTxtField.value,80,80);
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
