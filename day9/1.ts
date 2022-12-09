import * as fs from "fs";

const input: string = fs.readFileSync("day9/input.txt", "utf8");
const lines = input.split('\n');

let gridBounds = {
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
}
let startPosition = [0, 0];
let headPosition = [...startPosition];
let tailPosition = [...headPosition];

let tailPositions: number[][] = [tailPosition];

const processMoves = (moves: string[]) => {
  moves.forEach((moves) => {
    const direction = moves.split(' ')[0];
    const amount = parseInt(moves.split(' ')[1]);

    for (let i = 0; i < amount; i++) {
      let move = [0, 0];

      switch (direction) {
        case 'U':
          move[1] = -1;
          break;
        case 'D':
          move[1] = 1;
          break;
        case 'L':
          move[0] = -1;
          break;
        case 'R':
          move[0] = 1;
          break;
      }

      moveHead(move);
      moveTail();
    }
  })
}

const moveHead = (move: number[]) => {
  headPosition = [headPosition[0] + move[0], headPosition[1] + move[1]];

  if (headPosition[0] > gridBounds.maxX) gridBounds.maxX = headPosition[0];
  if (headPosition[0] < gridBounds.minX) gridBounds.minX = headPosition[0];
  if (headPosition[1] > gridBounds.maxY) gridBounds.maxY = headPosition[1];
  if (headPosition[1] < gridBounds.minY) gridBounds.minY = headPosition[1];
}

const moveTail = () => {
  let moveX = headPosition[0] - tailPosition[0];
  let moveY = headPosition[1] - tailPosition[1];

  if (Math.abs(moveX) <= 1 && Math.abs(moveY) <= 1) {
    return;
  }

  let move = [
    Math.sign(moveX) * Math.min(Math.abs(moveX), 1), 
    Math.sign(moveY) * Math.min(Math.abs(moveY), 1)
  ];

  tailPosition = [tailPosition[0] + move[0], tailPosition[1] + move[1]]

  if (!tailPositions.find((position) => position[0] === tailPosition[0] && position[1] === tailPosition[1])) {
    tailPositions.push(tailPosition);
  }
}

const gridChar = (position: number[]) => {
  if (headPosition[0] === position[0] && headPosition[1] === position[1]) return 'H';
  if (tailPosition[0] === position[0] && tailPosition[1] === position[1]) return 'T';
  if (startPosition[0] === position[0] && startPosition[1] === position[1]) return 's';
  return '.';
}

const gridToString = () => {
  let gridString = '';
  for (let row = gridBounds.minY; row <= gridBounds.maxY; row++) {
    let rowString = '';
    for (let col = gridBounds.minX; col <= gridBounds.maxX; col++) {
      rowString += gridChar([col, row]);
    }
    gridString += rowString + '\n';
  }
  return gridString;
}

processMoves(lines);
console.log(gridToString());
console.log(tailPositions.length);
