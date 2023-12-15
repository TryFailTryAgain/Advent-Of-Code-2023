// File: 12-4_p1.js
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
        this.points = 0;
    }
}
let cards = [];
let totalpoints = 0;
/* End Data structures */


/* Main */
// Splits the data into an array of lines
const lines = inputData.split('\n');

// Extract the data from each line and put it to be saved in cards
lines.forEach((line, i) => {
    // Skip empty lines
    if (line == '') return;
    let cardData = new CardData();
    cardData.cardNumber = getCardNumber(line);
    cardData.winningNumbers = getWinningNumbers(line);
    cardData.playedNumbers = getPlayedNumbers(line);
    cardData.points = calculatePoints(winningNumbersPlayed(cardData.winningNumbers, cardData.playedNumbers));
    cards.push(cardData);
});

// Calculate total points
cards.forEach((card) => {
    totalpoints += card.points;
});

console.log('Total points are: ' + totalpoints);

/* End Main */


/* Functions */
function getCardNumber(line) {
    // Regex to match find game number. Uses grouping to capture the number only
    const cardNumber = line.match(/Card\s+(\d+)/)[1];

    //console.log('Card number is: ' + cardNumber);
    return cardNumber;
}

// Gets the winning numbers from the line and returns them as an array
function getWinningNumbers(line) {
    let winningNumbers = line.match(/(?<=:\s+)(.*?)(?=\s+\|)/)[0];
    winningNumbers = winningNumbers.split(/\s+/);

    //console.log('Numbers before are: ' + numbersBefore);
    return winningNumbers;

}

// Gets the played numbers from the line and returns them as an array
function getPlayedNumbers(line) {
    let playedNumbers = line.match(/(?<=\|\s+)(.*)/)[0];
    playedNumbers = playedNumbers.split(/\s+/);

    //console.log('Numbers after are: ' + numbersAfter);
    return playedNumbers;
}

function winningNumbersPlayed(winningNumbers, playedNumbers) {
    let cardWins = 0;
    playedNumbers.forEach((number) => {
        if (winningNumbers.includes(number)) {
            cardWins++;
        }
    });

    //console.log('Card wins are: ' + cardWins);
    return cardWins;
}

// Calculates points per card. For each play we double the points
function calculatePoints(cardWins) {
    // Return if no wins
    if (cardWins == 0) return 0;
    let points = 1;
    // Double the points for each win but reduce by 1 because the first win is already counted by points = 1
    for (let i = 0; i < cardWins - 1; i++) {
        points += points;
    }

    //console.log('Card points are: ' + points);
    return points;
}

/* End Functions */

