import { readFile } from "fs/promises";

const inputBuffer = await readFile("input/adventofcode.com_2022_day_3_input.txt");

const ruckSacks = inputBuffer.toString().split("\n");

const getCommonItem = (comp1: string, comp2: string) => {
  const _comp2 = comp2.split("");

  for (let idx = 0; idx < _comp2.length; idx++) {
    if (comp1.includes(_comp2[idx])) {
      return _comp2[idx];
    }
  }
};

console.log(
  ruckSacks
    .map(
      (sacks) =>
        [sacks.slice(0, sacks.length / 2), sacks.slice(sacks.length / 2, sacks.length)] as const
    )
    .map((sack) => getCommonItem(...sack))
    .map((item) => Number(item?.codePointAt(0)) - (item?.match(/[a-z]/) ? 96 : 38))
    .reduce((a, b) => a + b)
);

// part 2

const groupBadges = [];

for (let idx = 0; idx < ruckSacks.length; idx += 3) {
  groupBadges.push(
    ruckSacks[idx]
      .split("")
      .filter((item) => ruckSacks[idx + 1].includes(item) && ruckSacks[idx + 2].includes(item))[0]
  );
}

console.log(
  groupBadges
    .map((item) => Number(item?.codePointAt(0)) - (item?.match(/[a-z]/) ? 96 : 38))
    .reduce((a, b) => a + b)
);
