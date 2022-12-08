import * as fs from "fs";

const input: string = fs.readFileSync("day8/input.txt", "utf8");
const lines = input.split('\n');

const isOuterEdge = (row: number, col: number) => {
  return row === 0 || col === 0 || row === lines.length - 1 || col === lines[row].length - 1;
}

const getScenicScore = (row: number, col: number) => {
  const height = lines[row][col];

  let scores = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  }
  // left side
  for (let i = col - 1; i >= 0; i--) {
    scores.left++;
    if (lines[row][i] >= height) {
      break;
    }
  }
  // top side
  for (let i = row - 1; i >= 0; i--) {
    scores.top++;
    if (lines[i][col] >= height) {
      break;
    }
  }
  // right side
  for (let i = col + 1; i < lines.length; i++) {
    scores.right++;
    if (lines[row][i] >= height) {
      break;
    }
  }
  // bottom side
  for (let i = row + 1; i < lines[row].length; i++) { 
    scores.bottom++;
    if (lines[i][col] >= height) {
      break;
    }
  }

  return scores.left * scores.top * scores.bottom * scores.right;
}

let bestScore = 0;
for (let row = 0; row < lines.length; row++) {
  const columns = lines[row];
  for (let col = 0; col < columns.length; col++) {
    bestScore = Math.max(getScenicScore(row, col), bestScore);
  }
}

console.log({ bestScore });