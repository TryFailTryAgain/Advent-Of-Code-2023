// File: 12-9_p1-2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 9 Question 1-2


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-9.txt', 'utf8');
// Split the data into each section
let data = inputData.split('\n');

/* End Data structure */


/* Main */
let sumOfExtrapolation = 0;
data.forEach(line => {
    if (line == '') return;
    line = line.split(' ').map(Number);
    sumOfExtrapolation += predictNext(line);
});

console.log('Part 1 sum: ' + sumOfExtrapolation);

/* End Main */


/* Functions */
function calcDiffs(history) {
    let diffs = [];
    for (let i = 1; i < history.length; i++) {
        diffs.push(history[i] - history[i - 1]);
    }
    
    //console.log(diffs);
    return diffs;
}

function predictNext(line) {
    let nextDiffs = line;
    let toAddBack = [];
    let nextVal = line[line.length - 1];

    // While all the differences are not the same, calculate diff one step further
    while (!nextDiffs.every(diff => diff == nextDiffs[0])) {
        nextDiffs = calcDiffs(nextDiffs);
        // Adds the last difference back to the list to be added back later
        toAddBack.push(nextDiffs[nextDiffs.length - 1]);
    }
    
    // Adds back the difference map changes
    toAddBack.forEach(diff => {
        nextVal += diff;
    });

    //console.log(nextVal);
    return nextVal;
}