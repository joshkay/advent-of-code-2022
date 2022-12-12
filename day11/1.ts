import * as fs from "fs";

const input: string = fs.readFileSync("day11/input.txt", "utf8");
const monkeyLines = input.split('\n\n');

const monkeys = monkeyLines.map(monkeyLine => {
  const monkeyDetails = monkeyLine.split('\n');

  const items = monkeyDetails[1].split(': ')[1].split(', ').map(num => parseInt(num));

  const operationLeft = monkeyDetails[2].split('= ')[1].split(' ')[0];
  const operationString = monkeyDetails[2].split('= ')[1].split(' ')[1];
  const operationRight = monkeyDetails[2].split('= ')[1].split(' ')[2];
  
  const operation = (old: number) => {
    let leftSide = old;
    if (operationLeft !== 'old') {
      leftSide = parseInt(operationLeft);
    }
    let rightSide = old;
    if (operationRight !== 'old') {
      rightSide = parseInt(operationRight);
    }

    if (operationString === '+') {
      return leftSide + rightSide;
    }
    if (operationString === '*') {
      return leftSide * rightSide;
    }
    return old;
  }

  const divisibleBy = parseInt(monkeyDetails[3].split('divisible by ')[1]);
  
  const test = (item: number) => item % divisibleBy === 0;

  const trueMonkey = parseInt(monkeyDetails[4].split('monkey ')[1]);
  const falseMonkey = parseInt(monkeyDetails[5].split('monkey ')[1]);

  return {
    items,
    operation,
    test,
    trueMonkey,
    falseMonkey,
  }
});

const ROUNDS = 20;

const monkeyInspections = monkeys.map(() => 0);

for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach(({
    items,
    operation,
    test,
    trueMonkey,
    falseMonkey,
  }, i) => {
    items.forEach(item => {
      monkeyInspections[i]++;
      item = operation(item);
      item = Math.floor(item / 3);

      const newMonkey = test(item) ? trueMonkey : falseMonkey;
      monkeys[newMonkey].items.push(item);
    })

    monkeys[i].items = [];
  });
}

monkeyInspections.sort((a, b) => b - a);
console.log(monkeyInspections[0] * monkeyInspections[1])
