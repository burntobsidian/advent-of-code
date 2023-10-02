import { readFile } from "fs/promises";

const inputBuffer = await readFile("input/adventofcode.com_2022_day_1_input.txt");

const input = inputBuffer
  .toString()
  .split("\n\n")
  .map((str) => str.split("\n").reduce((sum, val) => sum + Number(val), 0));

const largestNums = [0, 0, 0];

for (let idx = 0; idx < input.length; idx++) {
  let currElement = input[idx];

  for (let pos = 0; pos < 3; pos++) {
    if (currElement >= largestNums[pos]) {
      [largestNums[pos], currElement] = [currElement, largestNums[pos]];
    }
  }
}

console.log(largestNums.reduce((a, b) => a + b));
