'use strict';

var gMeme = {
    selectedImgElement: 5,
    txts: [
        {
            line: 'Your text here...',
            font: 'arial',
            color: 'red',
            size: 20,
            positionX: 70,
            positionY: 100
        }
    ]
}
var gCurrImg;



// Retrieve the meme model
function getMeme() {
    return gMeme;
}

/*************** GET ***************/

// Retrieve meme image
function getMemeImage() {
    gMeme.selectedImgElement = img;
}

// Retrieve meme text
function getMemeText() {
    return gMeme.txts[0].line;
}

// Retrieve meme font
function getMemeFont() {
    return gMeme.txts[0].font;
}

// Retrieve meme color
function getMemeColor() {
    return gMeme.txts[0].color;
}

// Retrieve meme size
function getMemeSize() {
    return gMeme.txts[0].size;
}

// Retrieve meme position X
function getMemePositionX() {
    return gMeme.txts[0].positionX;
}

// Retrieve meme position Y
function getMemePositionY() {
    return gMeme.txts[0].positionY;
}

/*************** UPDATE ***************/

// Update the meme image
function updateMemeImage(img) {
    gMeme.selectedImgElement = img;
}

// Update the meme text
function updateMemeText(text) {
    gMeme.txts[0].line = text;
}

// Update the meme font
function updateMemeFont(font) {
    gMeme.txts[0].font = font;
}

// Update the meme color
function updateMemeColor(color) {
    gMeme.txts[0].color = color;
}

// Update the meme size
function updateMemeSize(size) {
    gMeme.txts[0].size += size;
}

// Update the meme position X
function updateMemePositionX(position) {
    gMeme.txts[0].positionX += position;
}

// Update the meme position Y
function updateMemePositionY(position) {
    gMeme.txts[0].positionY += position;
}
