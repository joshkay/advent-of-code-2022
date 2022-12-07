import * as fs from 'fs';

const input: string = fs.readFileSync('day6/input.txt', 'utf8');

const NUM_UNIQUE_CHARS = 4;

let numCharsToProcess;

let uniqueChars: string[] = [];
input.split('').forEach((char, index) => {
  const uniqueCharIndex = uniqueChars.indexOf(char);
  if (uniqueCharIndex !== -1) {
    uniqueChars.splice(0, uniqueCharIndex + 1);
  }

  uniqueChars.push(char);

  if (uniqueChars.length === NUM_UNIQUE_CHARS && numCharsToProcess === undefined) {
    numCharsToProcess = index + 1;
  }
});

console.log({numCharsToProcess})