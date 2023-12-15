// File: 12-4_p2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 4 Question 2


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
        this.wins = 0;
        this.copies = 1;
    }
}
let cards = [];
let totalCards = 0;
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
    cardData.wins = winningNumbersPlayed(cardData.winningNumbers, cardData.playedNumbers);
    cards.push(cardData);
});

// Generate card copies
cards = createCopies(cards);

// Calculate total cards
cards.forEach((card) => {
    totalCards += card.copies;
});

// Prints final answer
console.log('Total number of cards is: ' + totalCards);

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

// Creates copies of cards to follow based on the number of wins the current card has
// The number of copies created for each of the cards to be copied is based on the 
//     number of copies the card already has
function createCopies(cards) {
    // Iterate through the stack of cards
    for (let i = 0; i < cards.length; i++) {
        // for each card, iterate through the number of wins it has
        for (let j = 1; j <= cards[i].wins; j++) {
            // For each win j, add cards[i].copies to the next j cards
            if (i + j < cards.length) { // Check if we are not at the end of the array
                cards[i + j].copies += cards[i].copies;
            }
        }
    }

    //console.log(cards);
    return cards;
}


/* End Functions */

