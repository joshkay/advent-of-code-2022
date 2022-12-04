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

const totalPriorities = rucksacks.reduce((acc, rucksack) => {
  const compartment1 = rucksack.substring(0, rucksack.length / 2);
  const compartment2 = rucksack.substring(rucksack.length / 2, rucksack.length - 1);

  const itemInBothCompartments = compartment1.split('').find(item => compartment2.indexOf(item) !== -1);

  const priority = getItemPriority(itemInBothCompartments as string);
  return priority + acc;
}, 0);

console.log(totalPriorities)