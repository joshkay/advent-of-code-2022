import * as fs from 'fs';

const input: string = fs.readFileSync('day4/input.txt', 'utf8');
const lines = input.split('\n');

const doSectionsOverlap = (a: string, b: string): boolean => {
  const aMin = parseInt(a.split('-')[0]);
  const aMax = parseInt(a.split('-')[1]);
  const bMin = parseInt(b.split('-')[0]);
  const bMax = parseInt(b.split('-')[1]);

  if (aMin >= bMin && aMax <= bMax ||
    bMin >= aMin && bMax <= aMax ||
    aMin >= bMin && aMin <= bMax ||
    bMin >= aMin && bMin <= aMax) {
      console.log({a, b})
    return true;
  }
  return false;
}

const numOverlappingSections = lines.reduce((acc, line) => {
  const sectionRange = line.split(',');
  return doSectionsOverlap(sectionRange[0], sectionRange[1]) ? 1 + acc : acc;
}, 0)

console.log({numOverlappingSections})