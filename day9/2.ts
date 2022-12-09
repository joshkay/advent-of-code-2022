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

const TAIL_LENGTH = 9;
let tailPosition = Array.from({ length: TAIL_LENGTH }, () => [...headPosition]);

let tailPositions: number[][] = [[...headPosition]];

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
      moveTail(headPosition);
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

const moveTail = (chasePosition, tailIndex = 0) => {
  let tailPartPosition = tailPosition[tailIndex];
  let moveX = chasePosition[0] - tailPartPosition[0];
  let moveY = chasePosition[1] - tailPartPosition[1];

  if (Math.abs(moveX) <= 1 && Math.abs(moveY) <= 1) {
    return;
  }

  let move = [
    Math.sign(moveX) * Math.min(Math.abs(moveX), 1), 
    Math.sign(moveY) * Math.min(Math.abs(moveY), 1)
  ];

  tailPartPosition = [tailPartPosition[0] + move[0], tailPartPosition[1] + move[1]]
  tailPosition[tailIndex] = tailPartPosition;

  if (tailIndex < tailPosition.length - 1) {
    moveTail(tailPartPosition, tailIndex + 1);
  }

  if (tailIndex === TAIL_LENGTH - 1) {
    if (!tailPositions.find((position) => position[0] === tailPartPosition[0] && position[1] === tailPartPosition[1])) {
      tailPositions.push(tailPartPosition);
    }
  }
}

const gridChar = (position: number[]) => {
  if (headPosition[0] === position[0] && headPosition[1] === position[1]) return 'H';
  for (let i = 0; i < tailPosition.length; i++) {
    const tailPartPosition = tailPosition[i];
    if (tailPartPosition[0] === position[0] && tailPartPosition[1] === position[1]) return i + 1;
  }
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
