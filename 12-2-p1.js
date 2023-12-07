// File: 12-2-p1.js
// Author: TryFailTryAgain
// Copyright (c) 2023. All rights reserved. For use in Open-Source projects this
// may be freely copied or excerpted with credit to the author.

// Advent of Code 2023 Day 2 Question 1

// Reads in the data from the text file
const fs = require('fs');
const inputData = fs.readFileSync('12-2.txt', 'utf8');

// Splits the data into an array of lines
const lines = inputData.split('\n');
