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
  'X': Outcome.Loss,
  'Y': Outcome.Tie,
  'Z': Outcome.Win,
}

const victories = {
  [Action.Rock]: Action.Scissors,
  [Action.Scissors]: Action.Paper,
  [Action.Paper]: Action.Rock
}

const getActionForOutcome = (action: Action, outcome: Outcome): Action => {
  if (outcome === Outcome.Tie) {
    return action;
  }

  if (outcome === Outcome.Loss) {
    return victories[action];
  }
  
  const winKey = Object.keys(victories).find(key => victories[key] === action) as string;
  const winAction: Action = parseInt(winKey) as Action;
  return winAction;
}

const totalScore = rounds.reduce((acc, round) => {
  const opponentAction: Action = letterAction[round[0]];
  const outcome: Outcome = letterAction[round[2]];

  const myAction = getActionForOutcome(opponentAction, outcome);
  const actionScore: number = myAction;
  const outcomeScore: number = outcome;

  return actionScore + outcomeScore + acc;
}, 0);

console.log(totalScore)