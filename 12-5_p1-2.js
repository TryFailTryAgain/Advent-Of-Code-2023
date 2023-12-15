// File: 12-5_p1-2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 5 Question 1-2


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-5.txt', 'utf8');
// Split the data into each section
let data = inputData.split('\n\n');

// Map object to hold the map data neatly
class map {
    constructor() {
        this.destination = 0;
        this.source = 0;
        this.range = 0;
    }
}
/* End Data structures */


/* Main */
let seeds = [];
let seedRanges = [];
seeds = extractSeeds(data);
seedRanges = extractSeedRanges(data);

let mapSets = [
    seedToSoilMapSet = extractMapSet(data[1]),
    soilToFertilizerMapSet = extractMapSet(data[2]),
    fertilizerToWaterMapSet = extractMapSet(data[3]),
    waterToLightMapSet = extractMapSet(data[4]),
    lightToTemperatureMapSet = extractMapSet(data[5]),
    temperatureToHumidityMapSet = extractMapSet(data[6]),
    humidityToLocationMapSet = extractMapSet(data[7])
];

p1Solve(seeds, mapSets);
p2Solve(seedRanges, mapSets);
/* End Main */


/* Functions */
// Extract the seeds
function extractSeeds(data) {
    //console.log(data[0].match(/(\d+)/g));
    return data[0].match(/(\d+)/g).map(Number);
}

function extractSeedRanges(data) {
    let seedRanges = [];
    const seeds = data[0].match(/(\d+)/g).map(Number);
    for (let i = 0; i < seeds.length - 1; i += 2) {
        seedRanges.push([seeds[i], seeds[i + 1]]);
    }

    //console.log(seedRanges);
    return seedRanges;
}

// Function to check if the seed is within any of the seedRanges
function isSeedInRange(seed, seedRanges) {
    for (let i = 0; i < seedRanges.length; i++) {
        const start = seedRanges[i][0];
        const range = seedRanges[i][1];
        const end = start + range;

        if (seed >= start && seed <= end) {
            //console.log('Seed ' + seed + ' is in range ' + start + ' to ' + end);
            return true;
        }
    }

    //console.log('Seed ' + seed + ' is not in range');
    return false;
}

// Extracts the maps from the specified map subset
// Returns an array of map objects that each have a destination, source, and range
function extractMapSet(dataSubset) {
    let mapSet = [];
    const dataSubsetLines = dataSubset.split('\n');
    dataSubsetLines.forEach(function (line) {
        // Skips the first line that contains the map name
        if (!(line.match(/(\d+)/g))) return;

        // Extracts the map values from the line and builds a new map object
        const mapData = line.match(/(\d+)/g);
        let mapObj = new map();

        mapObj.destination = parseInt(mapData[0]);
        mapObj.source = parseInt(mapData[1]);
        mapObj.range = parseInt(mapData[2]);
        mapSet.push(mapObj);
    })

    //console.log(maps);
    return mapSet;
}

// Takes a seed and returns the location
function seedToLocation(seed, mapSet) {
    let location = seed;
    // Uses find() as it returns the first element that satisfies the condition and then breaks
    // forEach() does not break even if returned
    const map = mapSet.find(function (map) {
        return location >= map.source && location <= map.source + map.range;
    });

    // If we found a valid map, calculate the location
    if (map) {
        location = calculateMap(location, map);
    }

    //console.log('Location is: ' + location);
    return location;
}

// Takes the source and the map and returns the destination
function calculateMap(source, map) {
    let destination = 0;
    destination = map.destination + (source - map.source);

    //console.log('Map destination is: ' + destination);
    return destination;
}

// Solves part 1 of the challenge
function p1Solve(seeds, mapSets) {
    let finalLocations = [];

    seeds.forEach(seed => {
        let location = seed;
        mapSets.forEach(mapSet => {
            location = seedToLocation(location, mapSet);
        });
        finalLocations.push(location);
    });

    // Finds the lowest location value
    console.log('Lowest location for Part 1: ' + Math.min(...finalLocations));
}

// Solves part 2 of the challenge using the range of seeds
function p2Solve(seedRanges, mapSets) {
    // Reverse the order of the sets
    reverseMapSets = mapSets.reverse();
    // Reverses the source and destination of each map in the set to work backwards from a location
    reverseMapSets.forEach(mapSet => {
        mapSet.forEach(map => {
            const mapSource = map.source;
            const mapDestination = map.destination;
            map.source = mapDestination;
            map.destination = mapSource;
        });
    });

    // Tries destination values until we find one that is in range of the seeds
    // We know the lowest location is 0, so we can start there
    // Should complete on average in about 10 seconds
    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
        let destination = i;
        reverseMapSets.forEach(mapSet => {
            destination = seedToLocation(destination, mapSet);
        });
        // If the destination is in range of the seeds, we found the lowest location(as we stated from 0)
        // and can now return.
        if (isSeedInRange(destination, seedRanges)) {
            console.log('Lowest location for Part 2: ' + i);
            return;
        }
    }
}
/* End Functions */