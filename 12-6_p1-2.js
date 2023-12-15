// File: 12-6_p1-2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 6 Question 1-2


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-6.txt', 'utf8');
// Split the data into each section
let data = inputData.split('\n');

// Clean way to store the data
class race {
    constructor(time, distance) {
        this.time = time;
        this.distance = distance;
    }
}
/* End Data structures */


/* Main */
let races = []
races = extractRaces(data);

solveP1(races);
/* End Main */


/* Functions */
// Takes the data and extracts the sets of races
function extractRaces(data) {
    const times = data[0].match(/\d+/g).map(Number);
    const distances = data[1].match(/\d+/g).map(Number);

    // Returns a new array created from each instance of a race time in the data
    races = times.map((time, i) => new race(time, distances[i]))
    //console.log(races);
    return races;
}

// Finds all potential winning race speeds
function winningSpeeds(race) {
    let winningSpeeds = [];
    for (let i = 1; i <= race.time; i++) {
        const newDistance = i * (race.time - i);
        if (newDistance > race.distance) {
            winningSpeeds.push(i);
        }
    }

    //console.log(winningSpeeds);
    return winningSpeeds;
}

function solveP1(races) {
    // For each race we find all the winning numbers,  take the total amount wins per race and multiply that total for each race together
    let winSum = races.reduce((accumulator, currentValue) => accumulator * winningSpeeds(currentValue).length, 1); 
    console.log('Part 1 - Possible win combination for all races multiplied together: ' + winSum);
}

/* End Functions */
