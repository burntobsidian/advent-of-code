import { readFile } from "fs/promises";

const inputBuffer = await readFile("input/adventofcode.com_2022_day_4_input.txt");

const assignmentPairs = inputBuffer
  .toString()
  .split("\n")
  .map((joined) => joined.split(","));

const assignmentPairsFullyContainingEachOther = assignmentPairs.filter((pair) => {
  const [firstAssStart, firstAssEnd] = pair[0].split("-").map(Number);
  const [secondAssStart, secondAssEnd] = pair[1].split("-").map(Number);

  return (
    (firstAssStart <= secondAssStart && firstAssEnd >= secondAssEnd) ||
    (secondAssStart <= firstAssStart && secondAssEnd >= firstAssEnd)
  );
}).length;

// part 2
console.log(
  assignmentPairs.filter((pair) => {
    const [firstAssStart, firstAssEnd] = pair[0].split("-").map(Number);
    const [secondAssStart, secondAssEnd] = pair[1].split("-").map(Number);

    return (
      (firstAssStart <= secondAssStart && firstAssEnd >= secondAssStart) ||
      (secondAssStart <= firstAssStart && secondAssEnd >= firstAssStart)
    );
  }).length
);
