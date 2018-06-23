'use strict';

var gMeme = {
    selectedImgId: null,
    txts: [
        {
            text: 'Your top text...',
            font: 'fantasy',
            color: 'white',
            size: 30,
            positionX: 170,
            positionY: 80
        },
        {
            text: 'Your bottom text...',
            font: 'fantasy',
            color: 'white',
            size: 30,
            positionX: 160,
            positionY: 480
        },
    ]
}
var gCurrTextIdx = 0;



// Retrieve the meme model
function getMeme() {
    return gMeme;
}

/*************** GET ***************/

// Retrieve meme image
function getMemeImage() {
    return gMeme.selectedImgId;
}

// Retrieve meme text
function getMemeText() {
    return gMeme.txts[gCurrTextIdx].text;
}

// Retrieve meme font
function getMemeFont() {
    return gMeme.txts[gCurrTextIdx].font;
}

// Retrieve meme color
function getMemeColor() {
    return gMeme.txts[gCurrTextIdx].color;
}

// Retrieve meme size
function getMemeSize() {
    return gMeme.txts[gCurrTextIdx].size;
}

// Retrieve meme position X
function getMemePositionX() {
    return gMeme.txts[gCurrTextIdx].positionX;
}

// Retrieve meme position Y
function getMemePositionY() {
    return gMeme.txts[gCurrTextIdx].positionY;
}

/*************** UPDATE ***************/

// Update the meme image
function updateMemeImage(imgId) {
    gMeme.selectedImgId = imgId;
}

// Update the meme text
function updateMemeText(text) {
    gMeme.txts[gCurrTextIdx].text = text;
}

// Update the meme font
function updateMemeFont(font) {
    gMeme.txts[gCurrTextIdx].font = font;
}

// Update the meme color
function updateMemeColor(color) {
    gMeme.txts[gCurrTextIdx].color = color;
}

// Update the meme size
function updateMemeSize(size) {
    gMeme.txts[gCurrTextIdx].size += size;
}

// Update the meme position X
function updateMemePositionX(position) {
    gMeme.txts[gCurrTextIdx].positionX += position;
}

// Update the meme position Y
function updateMemePositionY(position) {
    gMeme.txts[gCurrTextIdx].positionY += position;
}

// Update the meme alignment
function updateMemeAlignment(position, canvasWidth, textWidth) {
    switch (position) {
        case -1:
            gMeme.txts[gCurrTextIdx].positionX = 0;
            break;
        case 0:
            gMeme.txts[gCurrTextIdx].positionX = (canvasWidth - textWidth) / 2;
            break;
        case 1:
            gMeme.txts[gCurrTextIdx].positionX = canvasWidth - textWidth;
            break;
    }
}
