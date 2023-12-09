// File: 12-3-p2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 3 Question 2


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-3.txt', 'utf8');

// Data structures
let schematic = [];
let totalNums = 0;
/* End Data structures */


/* Main */
// Splits the data into an array of lines
const lines = inputData.split('\n');

// Constructs a 2D array to better represent the table of data
// Each line is the first dimension, each character is the second dimension

lines.forEach((line, i) => {
    schematic[i] = [];
    line.split('').forEach((char, j) => {
        schematic[i][j] = { char: char, counted: false };
    });
});

// Begins iterating through the schematic
for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic[i].length; j++) {
        // Checks if the current position is a symbol
        if (isSymbol(schematic, i, j)) {
            // Checks the 3x3 area around the symbol for numbers and saves their positions
            let positions = checkAreaForNums(schematic, i, j);
            if (positions) {
                totalNums += isValidGear(schematic, positions);
            }
        }
    }
}
console.log('Total sum of gear ratios is: ' + totalNums);
/* End Main */



/* Helper Functions */
// Checks if pos [i][j] is a symbol in the schematic and returns true if it is
function isSymbol(schematic, i, j) {
    // Regex to match find gears
    if (schematic[i][j].char.match(/\*/)) {
        //console.log('Symbol: \''+ schematic[i][j].char + '\' found at position [' + i + '][' + j + ']');
        return true;
    }
    return false;
}

// Checks the 3x3 area around the position of the symbol for numbers
function checkAreaForNums(schematic, x, y) {
    let positions = [];
    // Given position [x][y] check the 3x3 area around it for numbers
    for (let i = (x - 1); i <= (x + 1); i++) {
        for (let j = (y - 1); j <= (y + 1); j++) {
            // Checks if the current position is a number
            if (schematic[i][j].char.match(/[0-9]/)) {
                // Checks if the number has already been counted
                if (!schematic[i][j].counted) {
                    //console.log('New Number: \''+ schematic[i][j].char + '\' found at position [' + i + '][' + j + ']');
                    positions.push([i, j]);
                }
            }
        }
    }
    //console.log(positions);
    return positions;
}

// Given the position of a digit, captures the entire number that it is a part of if it is not already counted.
// Sets the digits to counted = true and returns the whole number.
// Returns null if the number has already been counted
function captureEntireNum(schematic, x, y) {
    let num = 0;
    let numString = '';
    // Checks if the number has already been counted
    if (schematic[x][y].counted) {
        return null;
    }
    // Check to the left until we reach a non-digit or the left boundary
    for (let j = y; j >= 0 && schematic[x][j].char.match(/[0-9]/); j--) {
        numString = schematic[x][j].char + numString;
        schematic[x][j].counted = true;
    }
    // Check to the right until it reach a non-digit or the right boundary
    for (let j = y + 1; j < schematic[x].length && schematic[x][j].char.match(/[0-9]/); j++) {
        numString = numString + schematic[x][j].char;
        schematic[x][j].counted = true;
    }
    // Converts the string to a number
    //console.log(numString);
    num = parseInt(numString);
    
    return num;
}

// Takes the array of number positions around a gear, captures the entire number, and checks if it is a valid gear
// Returns the gear ratio if it is valid, 0 otherwise
function isValidGear(schematic, positions){
    let gearRatio = 0;
    let gearNums = [];
    positions.forEach((pos) => {
        // If the number is null, then it has already been counted
        let capturedNum = captureEntireNum(schematic, pos[0], pos[1]);
        if( capturedNum != null)
            gearNums.push(capturedNum);
    });

    //console.log(gearNums);
    // Checks if the gear ratio is valid
    if (gearNums.length == 2){
        gearRatio = gearNums[0] * gearNums[1];
    }
    console.log('Gear Ratio: ' + gearRatio);
    return gearRatio;


}