// File: 12-2-p2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 2 Question 2


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-2.txt', 'utf8');

// build a datatype object
class GameData {
    constructor() {
        this.gameNumber = 0;
        this.redCubes = 0;
        this.greenCubes = 0;
        this.blueCubes = 0;
    }
}
/* End Data structure */


/* Main */
// Splits the data into an array of lines
const lines = inputData.split('\n');

// Will store all the individual GameData class for each game
let gamesData = [];

// Extract the data from each line
lines.forEach(function (line) {
    const hands = extractHands(line);
    // Each line is one single game, so extract the game number per line
    const gameNumber = extractGameNumber(line);
    hands.forEach(function (hand) {
        // Creates a new GameData object for each hand per game and puts the extracted data into it
        let handData = new GameData();
        handData = extractGameData(hand);
        handData.gameNumber = parseInt(gameNumber);

        // Adds the hand data to the array of games
        gamesData.push(handData);
        //console.log(handData);
    });
});

// Count the number of valid games
const validGamesCount = countValidGames(gamesData);
console.log('Valid games count is: ' + validGamesCount);

/* End Main */


/* Helper Functions */
// Extracts the hands from each line/game
function extractHands(line) {
    //split the line into individual hands in each game at the ; character
    let hands = line.split(';');
    return hands;
}

// Extracts the data from each hand
function extractGameData(hand) {
    let handData = new GameData();

    // Extracts the red cubes
    const redCubes = hand.match(/(\d+)\sred/g);
    handData.redCubes = countColorInHand(redCubes);

    // Extracts the green cubes
    const greenCubes = hand.match(/(\d+)\sgreen/g);
    handData.greenCubes = countColorInHand(greenCubes);

    // Extracts the blue cubes
    const blueCubes = hand.match(/(\d+)\sblue/g);
    handData.blueCubes = countColorInHand(blueCubes);

    //console.log(handData);
    return handData;
}

// Counts the total number of cubes of a color in a hand across multiple instances of the color
function countColorInHand(regexColorResponse) {
    // Takes the regex response and extract the number of cubes of that color considering the 
    //      possibility of multiple instances of the color in the hand
    let colorCount = 0;
    if (regexColorResponse != null) {
        regexColorResponse.forEach(function (color) {
            colorCount += parseInt(color.match(/(\d+)/));
        });
    }
    //console.log('Colors total count is : ' + colorCount);
    return colorCount;
}

// Extracts the game number from the line
function extractGameNumber(line) {
    // Extracts the game number
    if (line == '') {
        return 0;
    }
    const gameNumber = line.match(/Game\s(\d+)/)[1];

    //console.log('Game number is: ' + gameNumber);
    return gameNumber;
}

// Counts all the valid games in the array of games
function countValidGames(gamesData) {
    let currentGameNumber = 0;
    let currentMaxRedCubes = 0;
    let currentMaxGreenCubes = 0;
    let currentMaxBlueCubes = 0;

    let validGamesCount = 0;

    gamesData.forEach(function (game, index) {
        // If we are on a new game, then we can check if the previous game was valid and iterate
        if (currentGameNumber != game.gameNumber || gamesData.length - 1 == index) {
            // Makes the power set of the colors
            validGamesCount += (currentMaxRedCubes * currentMaxGreenCubes * currentMaxBlueCubes);
            // Resets the current max cubes for each color and update the currentGameNumber
            currentGameNumber = game.gameNumber;
            currentMaxRedCubes = 0;
            currentMaxGreenCubes = 0;
            currentMaxBlueCubes = 0;
        }
        // Updates all the current max cubes for each color within this game for this 'hand'
        currentMaxRedCubes = Math.max(currentMaxRedCubes, game.redCubes);
        currentMaxGreenCubes = Math.max(currentMaxGreenCubes, game.greenCubes);
        currentMaxBlueCubes = Math.max(currentMaxBlueCubes, game.blueCubes);
    });
    return validGamesCount;
}
/* End Helper Functions */