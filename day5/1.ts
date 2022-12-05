import * as fs from 'fs';

const input: string = fs.readFileSync('day5/input.txt', 'utf8');
const inputSections = input.split('\n\n');

const crateInput = inputSections[0];
const moveInput = inputSections[1];

const START_INDEX = 1;
const SPACING = 4

const parseCrates = (crates: string) => {
  const stackLines: string[] = crates.split('\n');
  const stackNumbers = stackLines.pop();
  let stacks: string[][] = stackNumbers!.split('   ').map(() => []);

  stackLines.reverse();
  stackLines?.forEach(stackLine => {
    stacks = stacks?.map((stack, stackIndex) => {
      const crate = stackLine[START_INDEX + (stackIndex * SPACING)];
      if (crate !== ' ') {
        stack.push(crate);
      }
      return stack;
    });
  });

  return stacks;
}

const parseMoves = (moves: string) => {
  return moves.split('\n').map((moveLine => {
    const movesBySpace = moveLine.split(' ');

    const amount = parseInt(movesBySpace[1]);
    const from = parseInt(movesBySpace[3]);
    const to = parseInt(movesBySpace[5]);

    return {
      amount, 
      from, 
      to
    }
  }));
}

const moves = parseMoves(moveInput);
const crates = parseCrates(crateInput);

console.log({moves, crates})

moves.forEach(({ amount, from, to }) => {
  const movingCrates = crates[from - 1].splice(crates[from - 1].length - amount, amount);
  crates[to - 1].push(...movingCrates.reverse());
});

const topCrates = crates.map(stack => stack[stack.length - 1]).join('');

console.log(topCrates);