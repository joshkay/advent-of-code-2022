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

const WIDTH = 40;
const SPRITE_SIZE = 3;

let crt: string[] = ['']; 

values.forEach((value, index) => {
  const col = index % (WIDTH);

  const showSprite = col + 1 >= value && col + 1 < value + SPRITE_SIZE;
  crt[crt.length - 1] += showSprite ? '#' : '.';

  if (col === WIDTH - 1) {
    crt.push('');
  }
});

console.log(crt.join('\n'));