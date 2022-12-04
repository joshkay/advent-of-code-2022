import * as fs from 'fs';

const input: string = fs.readFileSync('day1/input.txt', 'utf8');

const caloriesByElf: number[] = [];
const caloriesByLine = input.split('\n');

let runningCaloryCount = 0;
for (let i = 0; i < caloriesByLine.length; i++) {
  const line = caloriesByLine[i];

  if (line !== '') {
    runningCaloryCount += parseInt(line);
  }
  
  if (line === '' || i === caloriesByLine.length - 1) {
    caloriesByElf.push(runningCaloryCount);
    runningCaloryCount = 0;
  }
}

const topCalories = caloriesByElf.reduce((acc, calories) => {
  return Math.max(acc, calories);
}, 0);
console.log(topCalories);