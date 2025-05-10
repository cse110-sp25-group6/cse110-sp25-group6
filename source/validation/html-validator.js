const fs = require('fs');
const path = require('path');
const validator = require('html-validator');

// recieve file input
const input = process.argv[2];

if (!input) {
  console.error('Please provide a file or folder name.\nUsage: node html-validator.js <file|folder>');
  process.exit(1);
}

const inputPath = path.resolve(input);

if (!fs.statSync(inputPath).isFile()) {
  console.error(`❌ Not a file: ${inputPath}`);
  process.exit(1);
}

if (!inputPath.endsWith('.html')) {
  console.error('❌ Only .html files are supported.');
  process.exit(1);
}

// Read and validate file
const html = fs.readFileSync(inputPath, 'utf8');

const options = {
    data: html,
    format: 'text'
};

// Output result
validator(options)
    .then(result => {
        console.log(`\n Successful validation of ${path.basename(inputPath)}:\n${result}`);
    })
    .catch(err => {
        console.error(`\n Validation error in ${path.basename(inputPath)}:\n`, err);
    });


