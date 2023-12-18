// File: 12-7_p1-2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 7 Question 1-2


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-7.txt', 'utf8');
// Split the data into each section
let data = inputData.split('\n');

class CardHand {
    constructor(cards, bid) {
        this.cards = cards;
        this.bid = bid;
        this.handType = 0;
    }
}
/* End Data structure */

/* Main */
let hands = loadHands(data);
solveP1(hands);

/* End Main */


/* Functions */
function loadHands(data) {
    let hands = [];
    data.forEach(line => {
        if (line == '') return;
        let cards = line.match(/\w+/g)[0];
        let bid = line.match(/\w+/g)[1];
        hands.push(new CardHand(cards, bid));
    });

    //console.log(hands);
    return hands;
}

function getHandType(handObj) {
    // Creates a set so we can easily identify the different card types used in this hand
    const cardSet = new Set(handObj.cards);
    let cardGroups = [];
    cardSet.forEach(cardType => {
        // Regex to match all instances of a the current card type from the set
        cardGroups.push(handObj.cards.match(new RegExp(cardType, 'g')));
    });

    switch (cardGroups.length) {
        case 1:
            handObj.handType = 7; // 5 of a kind
            break;
        case 2:
            if (cardGroups[0].length == 4 || cardGroups[1].length == 4) {
                handObj.handType = 6; // 4 of a kind
            } else {
                handObj.handType = 5; // Full house, 3 of a kind + 2 of a kind
            }
            break;
        case 3:
            if (cardGroups[0].length == 3 || cardGroups[1].length == 3 || cardGroups[2].length == 3) {
                handObj.handType = 4; // 3 of a kind
            } else {
                handObj.handType = 3; // 2 pairs
            }
            break;
        case 4:
            handObj.handType = 2; // 1 pair
            break;
        case 5:
            handObj.handType = 1; // High card
            break;
        default:
            console.log('---Something went wrong---');
    }
    return;
}

function rankHands(hands) {
    let handsByType = [];
    // Object to convert card values to comparable numbers
    const cardValues = { 'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2 };

    // Sets each hands handType
    hands.forEach(hand => {
        getHandType(hand);
    });

    // Sorts the hands by handType, highest to lowest
    hands.sort((a, b) => {
        if (a.handType > b.handType) return -1;
        if (a.handType < b.handType) return 1;
    });

    hands.forEach(hand => {
        if (!handsByType[hand.handType]) {
            handsByType[hand.handType] = [];
        }
        handsByType[hand.handType].push(hand);
    });

    // For each type of hand
    handsByType.forEach(handType => {
        // Sorts the hands of that type by card value by comparing the first card to last card in the hand
        // This returns the sorted array from LOWEST to HIGHEST
        handType.sort((a, b) => {
            for (let i = 0; i < a.cards.length; i++) {
                if (cardValues[a.cards[i]] > cardValues[b.cards[i]]) return 1;
                if (cardValues[a.cards[i]] < cardValues[b.cards[i]]) return -1;
            }
            return 0;
        });
    });

    //console.log(handsByType.flat());
    return handsByType.flat();
}

function calculateScore(rankedHands) {
    let score = 0;
    rankedHands.forEach((handObj, index) => {
        // Index + 1 to account for index starting at 0
        score += handObj.bid * (index + 1);
    });

    //console.log(score);
    return score;
}

function solveP1(hands){
    console.log('Total winnings for Part 1: ' + calculateScore(rankHands(hands)));
    return;
}



/* End Functions */