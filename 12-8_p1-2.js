// File: 12-8_p1-2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 8 Question 1-2


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-8.txt', 'utf8');
const testData = fs.readFileSync('12-8-testing.txt', 'utf8');
// Split the data into each section
let data = inputData.split('\n');
let testingData = testData.split('\n');

/* End Data structure */


/* Main */
solveP1(data);
solveP2(data);
/* End Main */


/* Functions */
function extractPath(data) {
    //console.log(data[0]);
    return data[0].split('');
}

function extractNodes(data) {
    // Grabs just the nodes from the data
    let map = {};
    nodes = data.slice(2, data.length - 1);
    nodes.forEach(line => {
        if (line == '') return;
        let key = line.match(/\w+/g)[0];
        let left = line.match(/\w+/g)[1];
        let right = line.match(/\w+/g)[2];
        // Inserts the node into the map
        addNode(map, key, left, right);
    });

    //console.log(map);
    return map;
}

function addNode(map, key, left, right) {
    // If the node doesn't exist, add it to the map
    if (!map[key]) {
        map[key] = {
            left: left,
            right: right
        };
    } else {
        console.error('---Node already exists!---');
    }
}

// Navigates the map we constructed using the directions provided by the path
function navigateMap(map, path, startNode, endSequence) {
    let currentNode = startNode;
    let pathIndex = 0;

    // Create a regex based on endSequence
    let endSequenceRegex;
    if (endSequence.length < 3) {
        endSequenceRegex = new RegExp('.'.repeat(3 - endSequence.length) + endSequence);
    } else {
        endSequenceRegex = new RegExp(endSequence);
    }
    // As long as the current node isn't the end node, keep going
    while (!currentNode.match(endSequenceRegex)) {
        // The current direction is the index we are on modulo the length of the path. This allows 
        //   us to loop through the path repeatedly while keeping track of how many steps we've taken
        let direction = path[pathIndex % path.length];
        if (direction == 'L') {
            currentNode = map[currentNode].left;
        } else {
            currentNode = map[currentNode].right;
        }
        pathIndex++;
    }

    //console.log(pathIndex);
    return pathIndex;
}

// Finds the least common multiple of an array of numbers
function lcm(arr) {
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }
    let res = arr[0];

    for (let i = 1; i < arr.length; i++) {
        res = (res * arr[i]) / gcd(res, arr[i]);
    }

    //console.log(res);
    return res;
}

function solveP1(data) {
    // Builds a map object
    const path = extractPath(data);
    const fullMap = extractNodes(data);
    const totalSteps = navigateMap(fullMap, path, 'AAA', 'ZZZ');

    console.log('Total steps taken for Part 1: ' + totalSteps);
}

function solveP2() {
    // Builds a map object
    const path = extractPath(data);
    const fullMap = extractNodes(data);
    // Gets all the 'A' starting nodes
    const startNodes = Object.keys(fullMap).filter(key => key.match(/..A/g));
    // Finds each starting nodes steps to 'Z' individually and returns an array of those values
    const stepsToEachZ = startNodes.map(node => navigateMap(fullMap, path, node, 'Z'));

    // Finds the least common multiple of each number of steps to 'Z' from each starting node
    console.log('Total steps taken for Part 2: ' + lcm(stepsToEachZ));
}
/* End Functions */