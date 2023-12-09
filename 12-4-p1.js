// File: 12-4-p1.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 4 Question 1


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-4.txt', 'utf8');

// Data structures
class CardData {
    constructor() {
        this.cardNumber = 0;
        this.winningNumbers = 0;
        this.playedNumbers = 0;
    }
}
let totalpoints = 0;
/* End Data structures */


/* Main */
// Splits the data into an array of lines
const lines = inputData.split('\n');

// Constructs a 2D array to better represent the table of data
// Each line is the first dimension, each character is the second dimension

lines.forEach((line, i) => {
    getCardNumber(line);
    getWinningNumbers(line);
    getPlayedNumbers(line);
});

/* End Main */


/* Functions */
function getCardNumber(line){
    if(line == '') return;
    // Regex to match find game number. Uses grouping to capture the number only
    const cardNumber = line.match(/Card\s+(\d+)/)[1];
    
    //console.log('Card number is: ' + cardNumber);
    return cardNumber;
}

// Gets the winning numbers from the line and returns them as an array
function getWinningNumbers(line){
    let numbersBefore = line.match(/(?<=:\s+)(.*?)(?=\s+\|)/)[0];
    numbersBefore = numbersBefore.split(/\s+/);

    //console.log('Numbers before are: ' + numbersBefore);
    return numbersBefore;

}

// Gets the played numbers from the line and returns them as an array
function getPlayedNumbers(line){
    let numbersAfter = line.match(/(?<=\|\s+)(.*)/)[0];
    numbersAfter = numbersAfter.split(/\s+/);

    //console.log('Numbers after are: ' + numbersAfter);
    return numbersAfter;

}


/* End Functions */

