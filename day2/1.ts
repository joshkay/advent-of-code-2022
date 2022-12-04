import * as fs from 'fs';

const input: string = fs.readFileSync('day2/input.txt', 'utf8');
const rounds = input.split('\n');

enum Action {
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

enum Outcome {
  Loss = 0,
  Tie = 3,
  Win = 6
}

const letterAction = {
  'A': Action.Rock,
  'B': Action.Paper,
  'C': Action.Scissors,
  'X': Action.Rock,
  'Y': Action.Paper,
  'Z': Action.Scissors,
}

const victories = {
  [Action.Rock]: Action.Scissors,
  [Action.Scissors]: Action.Paper,
  [Action.Paper]: Action.Rock
}

const getOutcomeOfRound = (a: Action, b: Action) => {
  if (a === b) {
    return Outcome.Tie;
  }

  if (victories[a] === b) {
    return Outcome.Win;
  }
  
  return Outcome.Loss;
}

const totalScore = rounds.reduce((acc, round) => {
  const opponentAction = letterAction[round[0]];
  const myAction = letterAction[round[2]];
  
  const actionScore: number = myAction;
  const outcomeScore: number = getOutcomeOfRound(myAction, opponentAction);

  return actionScore + outcomeScore + acc;
}, 0);

console.log(totalScore)