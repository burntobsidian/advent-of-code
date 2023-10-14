import { readFile } from "fs/promises";

const inputBuffer = await readFile("input/adventofcode.com_2022_day_2_input.txt");

const input = inputBuffer.toString().split("\n");

const rps = {
  // A for Rock, B for Paper, and C for Scissors.
  A: "rock",
  B: "paper",
  C: "scissors",
  // X for Rock, Y for Paper, and Z for Scissors
  X: "rock",
  Y: "paper",
  Z: "scissors",
} as const;

// (1 for Rock, 2 for Paper, and 3 for Scissors)
const shapeScore = {
  rock: 1,
  paper: 2,
  scissors: 3,
} as const;

type Shape = (typeof rps)[keyof typeof rps];

// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
const calculateGameResult = (myShape: Shape, opponentShape: Shape): -1 | 0 | 1 => {
  if (myShape === opponentShape) {
    return 0;
  }
  if (
    (myShape === "rock" && opponentShape === "scissors") ||
    (myShape === "scissors" && opponentShape === "paper") ||
    (myShape === "paper" && opponentShape === "rock")
  ) {
    return 1;
  }
  return -1;
};

const calculateScore = (myShape: Shape, opponentShape: Shape) => {
  let score = shapeScore[myShape];

  const gameResult = calculateGameResult(myShape, opponentShape);

  //   (0 if you lost, 3 if the round was a draw, and 6 if you won)
  if (gameResult === 0) score += 3;
  if (gameResult === 1) score += 6;

  return score;
};

// part 1
console.log(
  input.reduce((totalScore, game) => {
    // console.log(game);
    const myInput = game[2];
    const opponentInput = game[0];

    if (
      (myInput !== "X" && myInput !== "Y" && myInput !== "Z") ||
      (opponentInput !== "A" && opponentInput !== "B" && opponentInput !== "C")
    )
      throw new Error("invalid input values");

    return totalScore + calculateScore(rps[myInput], rps[opponentInput]);
  }, 0)
);

// part 2
const calculateMyShape = (opponentShape: Shape, gameResult: "X" | "Y" | "Z"): Shape => {
  // draw
  if (gameResult === "Y") return opponentShape;

  const shapes: Shape[] = ["rock", "scissors", "paper"];

  const idx = shapes.indexOf(opponentShape);

  // win
  if (gameResult === "Z") return shapes[(idx + shapes.length - 1) % shapes.length];

  // lose
  if (gameResult === "X") return shapes[(idx + shapes.length + 1) % shapes.length];

  throw "how did we get here typescript";
};

console.log(
  input.reduce((totalScore, game) => {
    const gameResult = game[2];
    const opponentInput = game[0];

    if (
      (gameResult !== "X" && gameResult !== "Y" && gameResult !== "Z") ||
      (opponentInput !== "A" && opponentInput !== "B" && opponentInput !== "C")
    )
      throw new Error("invalid input values");

    let score = totalScore;

    if (gameResult === "Y") score += 3;
    if (gameResult === "Z") score += 6;

    score += shapeScore[calculateMyShape(rps[opponentInput], gameResult)];

    return score;
  }, 0)
);
