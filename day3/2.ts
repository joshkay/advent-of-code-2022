import * as fs from 'fs';

const input: string = fs.readFileSync('day3/input.txt', 'utf8');
const rucksacks = input.split('\n');

const lowerCaseCharCodeStart = 'a'.charCodeAt(0);

const getItemPriority = (item: string) => {
  let priorityStart = 1;
  
  const lowerCaseItem = item.toLowerCase() as string;
  if (lowerCaseItem !== item) {
    priorityStart = 27;
  }

  const priority = priorityStart + lowerCaseItem.charCodeAt(0) - lowerCaseCharCodeStart;
  return priority;
}

let totalPriorities = 0;
for (let i = 0; i < rucksacks.length / 3; i++) {
  const rucksack1 = rucksacks[i * 3];
  const rucksack2 = rucksacks[i * 3 + 1];
  const rucksack3 = rucksacks[i * 3 + 2];

  const itemInAllRucksacks = rucksack1.split('').find(item => rucksack2.indexOf(item) !== -1 && rucksack3.indexOf(item) !== -1);
  const priority = getItemPriority(itemInAllRucksacks as string);
  totalPriorities += priority;
}

console.log(totalPriorities)