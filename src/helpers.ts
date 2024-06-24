import { ScorePoints } from "./components/Score";

const rollNumber = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

const rollDiceNew = () => {
  const dice = new Array(5).fill(0);
  const newDice = dice.map(() => rollNumber());
  return newDice;
};

const rollDice = (roll: number[], kept: number[]) => {
  return roll.map((die, i) => {
    if (kept.includes(i)) return die;
    return rollNumber();
  });
};

const keep = (
  index: number,
  kept: number[],
  setKept: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const newKept = [...kept];
  if (newKept.includes(index)) {
    newKept.splice(newKept.indexOf(index), 1);
  } else {
    newKept.push(index);
  }
  const sorted = [...newKept];
  setKept(sorted.sort());

  return [];
};

const matching = (number: number, amount: number) => {
  return number * amount;
};

const ofAKind = (roll: number[], size: "three" | "four") => {
  const copyOfRoll: number[] = [...roll];
  const sorted = copyOfRoll.sort();
  if (new Set(sorted).size <= 3) {
    const counts = sorted.reduce(
      (acc: { [key: string | number]: number }, value) => ({
        ...acc,
        [value]: value in acc ? acc[value] + 1 : 1,
      }),
      {}
    );

    if (
      size === "three" &&
      Object.values(counts).some((value: number) => value >= 3)
    )
      return roll.reduce((acc, curr) => acc + curr);
    if (
      size === "four" &&
      Object.values(counts).some((value: number) => value >= 4)
    )
      return roll.reduce((acc, curr) => acc + curr);
  }
  return 0;
};

const straight = (roll: number[], size: "large" | "short") => {
  const sorted = Array.from(new Set([...roll].sort()));
  if (sorted.length <= 4) return 0;

  if (
    size === "large" &&
    sorted.reduce((acc: number, next: number) => {
      if (next === acc + 1) acc++;
      return acc;
    }, 0) > 4
  )
    return 40;

  if (
    size === "short" &&
    sorted.reduce((acc: number, next: number) => {
      if (next === acc + 1) acc++;
      return acc;
    }, 0) >= 4
  )
    return 30;

  return 0;
};

const fullHouse = (roll: number[]) => {
  const sorted: number[] = [...roll].sort();
  if (new Set(sorted).size === 2) {
    const counts = sorted.reduce(
      (acc: { [key: string | number]: number }, value) => ({
        ...acc,
        [value]: value in acc ? acc[value] + 1 : 1,
      }),
      {}
    );

    if (Object.values(counts).every((value: number) => value >= 2)) return 25;
  }
  return 0;
};

const yatzi = (roll: number[]) => {
  return new Set(roll).size === 1 ? 50 : 0;
};

const calculatePoints = (roll: number[]): ScorePoints => {
  return {
    one: matching(1, roll.filter((die) => die === 1).length),
    two: matching(2, roll.filter((die) => die === 2).length),
    three: matching(3, roll.filter((die) => die === 3).length),
    four: matching(4, roll.filter((die) => die === 4).length),
    five: matching(5, roll.filter((die) => die === 5).length),
    six: matching(6, roll.filter((die) => die === 6).length),
    threeOfAKind: ofAKind(roll, "three"),
    fourOfAKind: ofAKind(roll, "four"),
    shortStraight: straight(roll, "short"),
    largeStraight: straight(roll, "large"),
    fullHouse: fullHouse(roll),
    yatzi: yatzi(roll),
    chance: roll.reduce((acc, curr) => acc + curr),
  };
};

const calculateTopTotal = (top: number[]) => {
  let sum = top.reduce((acc, next) => acc + next);
  if (sum >= 65) sum = sum + 35;
  return sum;
};

export {
  rollNumber,
  rollDiceNew,
  rollDice,
  keep,
  matching,
  ofAKind,
  straight,
  fullHouse,
  yatzi,
  calculatePoints,
  calculateTopTotal,
};
