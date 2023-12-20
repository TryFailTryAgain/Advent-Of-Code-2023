// File: 12-8_p1-2.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.
// Advent of Code 2023 Day 8 Question 1-2


/* Data structure */
// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-8.txt', 'utf8');
// Split the data into each section
let data = inputData.split('\n');

/* End Data structure */


/* Main */
solveP1(data);

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
function navigateMap(map, path, startNode) {
    let currentNode = startNode;
    let pathIndex = 0;
    // As long as the current node isn't the end node, keep going
    while (currentNode !== 'ZZZ') {
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

function solveP1(data) {
    // Builds a map object
    let fullMap = {};
    path = extractPath(data);
    fullMap = extractNodes(data);
    const totalSteps = navigateMap(fullMap, path, 'AAA');
    console.log('Total steps taken for Part 1: ' + totalSteps);
}

function solveP2() {

}
/* End Functions */