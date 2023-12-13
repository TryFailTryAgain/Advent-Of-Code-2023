// File: 12-1-p2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.

// Advent of Code 2023 Day 1 Question 2

// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-1.txt', 'utf8');

// Splits the data into an array of lines
const lines = inputData.split('\n');

// Object to convert string numbers to integers
const wordToDigit = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
};

// List out all the strings we will need to find in the lines
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
// Stores all the extracted digits in an array of arrays
let extractedDigits = [];

// Check each line for every type of digit individually. This is done to prevent the regex from being greedy and matching skipping
//      over numbers that may share a char with another number. Ex: 'oneight' would match only 'one' or 'eight' if we used a single regex
lines.forEach(function (line, index) {
    let lineDigitPosArray = [];
    digits.forEach(digit => {
        currentRegex = new RegExp(digit, 'g');
        let match;
        // So long as the regex finds a match for that digit, it will push the match to the array
        while (((match = currentRegex.exec(line)) != null)) {
            lineDigitPosArray.push(match);
        }
    });
    extractedDigits[index] = (lineDigitPosArray);
});
console.log('Raw data from extraction:');
console.log(extractedDigits[1]);


// Extracts only first and last numbers
let firstNumbers = [];
let lastNumbers = [];

for (let i = 0; i < extractedDigits.length; i++) {
    let lineDigits = extractedDigits[i];
    if (lineDigits.length > 0) {
        // Finds the index of the lowest and highest numbers
        // This is accomplished by iterating through the array of objects and comparing the current digits in the line to the current lowest and highest
        // If currentDigit is lower than the current lowest, then the index of currentDigit is returned, otherwise the index of the current lowest is returned.
        //      The reason for this is to prevent the need to sort all the digits in each line
        let lowestIndex = lineDigits.reduce((minIndex, currentDigit) => currentDigit.index < lineDigits[minIndex].index ? lineDigits.indexOf(currentDigit) : minIndex, 0);
        let highestIndex = lineDigits.reduce((maxIndex, currentDigit) => currentDigit.index > lineDigits[maxIndex].index ? lineDigits.indexOf(currentDigit) : maxIndex, 0);
        // Pushes the matches to the firstNumbers and lastNumbers arrays
        firstNumbers.push(lineDigits[lowestIndex]);
        lastNumbers.push(lineDigits[highestIndex]);
    }
}
console.log('First number post extraction: ');
console.log(firstNumbers[1]);
console.log('Last number post extraction: ');
console.log(lastNumbers[1]);


// Converts the string numbers to integers
firstNumbers = firstNumbers.map(number => wordToDigit[number] || number);
lastNumbers = lastNumbers.map(number => wordToDigit[number] || number);

console.log('First number post conversion: ');
console.log(firstNumbers[1]);
console.log('Last number post conversion: ');
console.log(lastNumbers[1]);


// Combines the array of number strings to get the calibration values for each line.
// If only one number was found for a line then the first and last number will be the same but since we
//      always need a pair of numbers we can just add it to itself.
let calibrations = firstNumbers.map((first, index) => first + lastNumbers[index]);
console.log(calibrations);

// Finds the sum of all the calibrations combined
// ParseInt is used to convert the string to an integer when adding for the final sum
const sum = calibrations.reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));

// Final result
console.log("The final calibration sum is: " + sum);
