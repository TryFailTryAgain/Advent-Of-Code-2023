// File: 12-1-p1.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.

// Advent of Code 2023 Day 1 Question 1

// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-1.txt', 'utf8');

// Splits the data into an array of lines
const lines = inputData.split('\n');

// Exacts the numbers. g flag is global, so it will find all matches
const numbers = lines.map( line => line.match(/[1-9]/g));

// Extract only first and last numbers
// Ternary operator is used to check if the line is truthy aka null and if so, return null
const firstNumbers = numbers.map(line => line ? line[0] : '0');
const lastNumbers = numbers.map(line => line ? line[line.length - 1] : '0');
//console.log(firstNumbers);
//console.log(lastNumbers);

// Combines the array of number strings to get the calibration values for each line.
// If only one number was found for a line then the first and last number will be the same but since we
// always need a pair of numbers we can just add it to itself.
let calibrations = firstNumbers.map( (first, index) => first + lastNumbers[index]);
//calibrations = calibrations.map( calibration => parseInt(calibration));
console.log(calibrations);

// Finds the sum of all the calibrations combined
// parseInt is used to convert the string to an integer when adding for the final sum
const sum = calibrations.reduce( (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue));

// Final result
console.log("The final calibration sum is: "+ sum);
