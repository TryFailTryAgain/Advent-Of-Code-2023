// File: 12-2-p1.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 2 Question 1


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-2.txt', 'utf8');

// build a datatype object
class GameData {
    constructor() {
        this.gameNumber = 0;
        this.redCubes = 0;
        this.blueCubes = 0;
        this.greenCubes = 0;
    }
}
/* End Data structure */


/* Main */
// Splits the data into an array of lines
const lines = inputData.split('\n');
//const lines = ['Game 1: 4 green, 5 blue, 33 red, 5 blue; 1 red, 9 green, 10 blue; 5 blue, 6 green, 2 red; 7 green, 9 blue, 1 red; 2 red, 10 blue, 10 green; 7 blue, 1 red']


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

    // Extracts the blue cubes
    const blueCubes = hand.match(/(\d+)\sblue/g);
    handData.blueCubes = countColorInHand(blueCubes);

    // Extracts the green cubes
    const greenCubes = hand.match(/(\d+)\sgreen/g);
    handData.greenCubes = countColorInHand(greenCubes);

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
    const maxRedCubes = 12;
    const maxBlueCubes = 14;
    const maxGreenCubes = 13;
    let validGamesCount = 0;

    let currentGameNumber = 0;
    let currentGameValid = true; 
    gamesData.forEach(function (game) {
        // If we are on a new game, then we can check if the previous game was valid and iterate
        if (currentGameNumber != game.gameNumber) {
            if (currentGameValid == true) {
                validGamesCount += currentGameNumber;
            }
            // Reset the current game number to the new game and valid flag to true
            currentGameNumber = game.gameNumber;
            currentGameValid = true;
        }
        // If invalid, sets the valid flag to false
        if (!(game.redCubes <= maxRedCubes && game.blueCubes <= maxBlueCubes && game.greenCubes <= maxGreenCubes)) {
            currentGameValid = false;
        }
    });
    return validGamesCount;
}
/* End Helper Functions */