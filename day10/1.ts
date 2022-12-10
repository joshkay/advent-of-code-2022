import * as fs from "fs";

const input: string = fs.readFileSync("day10/input.txt", "utf8");
const lines = input.split('\n');

let x = 1;

let values: number[] = [];

lines.forEach(line => {
  const instruction = line.split(' ')[0];

  if (instruction === 'noop') {
    values.push(x);
    return;
  }

  const amount = parseInt(line.split(' ')[1]);

  values.push(x);
  values.push(x);
  x += amount;
});
values.push(x);

const indices = [20, 60, 100, 140, 180, 220];

const total = indices.reduce((acc, index) => (
  acc += values[index - 1] * index
), 0);

console.log(total)