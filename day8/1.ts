import * as fs from "fs";

const input: string = fs.readFileSync("day8/input.txt", "utf8");
const lines = input.split('\n');

const isOuterEdge = (row: number, col: number) => {
  return row === 0 || col === 0 || row === lines.length - 1 || col === lines[row].length - 1;
}

const isTreeVisible = (row: number, col: number) => {
  const height = lines[row][col];

  if (isOuterEdge(row, col)) {
    return true;
  }

  // left side
  for (let i = col - 1; i >= 0; i--) {
    if (lines[row][i] >= height) {
      break;
    }
    if (isOuterEdge(row, i)) {
      return true;
    }
  }
  // top side
  for (let i = row - 1; i >= 0; i--) {
    if (lines[i][col] >= height) {
      break;
    }
    if (isOuterEdge(i, col)) {
      return true;
    }
  }
  // right side
  for (let i = col + 1; i < lines.length; i++) {
    if (lines[row][i] >= height) {
      break;
    }
    if (isOuterEdge(row, i)) {
      return true;
    }
  }
  // bottom side
  for (let i = row + 1; i < lines[row].length; i++) {
    if (lines[i][col] >= height) {
      break;
    }
    if (isOuterEdge(i, col)) {
      return true;
    }
  }

  return false;
}

let numTreesVisible = 0;
for (let row = 0; row < lines.length; row++) {
  const columns = lines[row];
  for (let col = 0; col < columns.length; col++) {
    if (isTreeVisible(row, col)) {
      numTreesVisible++;
    }
  }
}

console.log({ numTreesVisible });