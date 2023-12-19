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
solveP2(hands);

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

function getHandType(handObj, jokerIsWild = false) {
    // Creates a set to remove duplicates and identify only how many card types we have in each hand
    const cardSet = new Set(handObj.cards);
    let cardGroups = [];
    // For each card type, create a group of cards that match that type
    cardSet.forEach(cardType => {
        cardGroups.push(handObj.cards.match(new RegExp(cardType, 'g')));
    });
    // Sets the handType based on the number of groups of cards + some special cases
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
    // If we are checking solutions for part 2, then the joker card is w wild card and we need to update the handtype to 
    //   account for the improvements that will be provided by the joker
    if (jokerIsWild && cardSet.has('J')) {
        let jokerGroupId = 0;
        cardGroups.forEach((group, index) => {
            if (group.includes('J')) {
                jokerGroupId = index;
                return;
            }
        });
        let largestGroup = cardGroups.reduce((maxGroup, currentGroup) => currentGroup.length > maxGroup.length ? currentGroup : maxGroup, '');
        switch (handObj.handType) {
            case 7: // Five of a kind. No improvement
                break;
            case 6: // Four of a kind, improve to five of a kind
                handObj.handType = 7;
                break;
            case 5: // Full house, improve to 4 or 5 of a kind
                if (cardGroups[jokerGroupId].length == 1) {
                    handObj.handType = 6;
                } else {
                    handObj.handType = 7;
                }
                break;
            case 4: // Three of a kind, improves to 4 or 5 of a kind
                if (largestGroup.includes('J')) {
                    handObj.handType = 6;
                    break;
                }
                if (cardGroups[jokerGroupId].length == 1) {
                    handObj.handType = 6;
                } else {
                    handObj.handType = 7;
                }
                break;
            case 3: // Two pairs, improves to full house, 4 of a kind, or 5 of a kind
                if (cardGroups[jokerGroupId].length == 1) {
                    handObj.handType = 5;
                } else if (cardGroups[jokerGroupId].length == 2) {
                    handObj.handType = 6;
                } else {
                    handObj.handType = 7;
                }
                break;
            case 2: // One pair, improves to 3 of a kind, full house, 4 of a kind, or 5 of a kind
                if (largestGroup.includes('J')) {
                    handObj.handType = 4;
                    break;
                }
                if (cardGroups[jokerGroupId].length == 1) {
                    handObj.handType = 4;
                } else if (cardGroups[jokerGroupId].length == 2) {
                    handObj.handType = 6;
                } else if (cardGroups[jokerGroupId].length == 3) {
                    handObj.handType = 7;
                }
                break;
            case 1: // High card, improves to one pair, two pair, full house, 4 of a kind, or 5 of a kind
                if (cardGroups[jokerGroupId].length == 1) {
                    handObj.handType = 2;
                } else if (cardGroups[jokerGroupId].length == 2) {
                    handObj.handType = 3;
                } else if (cardGroups[jokerGroupId].length == 3) {
                    handObj.handType = 5;
                } else if (cardGroups[jokerGroupId].length == 4) {
                    handObj.handType = 6;
                } else {
                    handObj.handType = 7;
                }
                break;
            default:
                console.log('---Something went wrong---');
        }
    }
}

function rankHands(hands, cardValues) {
    let handsByType = [];

    // Sets each hands handType
    hands.forEach(hand => {
        if (cardValues['J'] === 1) {
            getHandType(hand, true);
        } else {
            getHandType(hand);
        }
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

function solveP1(hands) {
    // Object to convert card values to comparable numbers
    const cardValues = { 'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2 };
    console.log('Total winnings for Part 1: ' + calculateScore(rankHands(hands, cardValues)));
    return;
}

function solveP2(hands) {
    // Object to convert card values to comparable numbers
    const cardValues = { 'A': 14, 'K': 13, 'Q': 12, 'J': 1, 'T': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2 };
    let rankedHands = rankHands(hands, cardValues);
    //console.log(rankedHands.reverse().slice(0, 100));
    let score = calculateScore(rankedHands);
    console.log('Total winnings for Part 2: ' + score);

}



/* End Functions */