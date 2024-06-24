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
  if (sorted.length < 4) return 0;

  console.log(sorted);
  if (
    size === "large" &&
    sorted.reduce((acc: number, next: number) => {
      if (next === acc + 1) acc++;
      return acc;
    }, sorted[0]) ===
      sorted[0] + 4
  )
    return 40;

  if (
    size === "short" &&
    sorted.reduce((acc: number, next: number) => {
      if (next === acc + 1) acc++;
      return acc;
    }, sorted[0]) >=
      sorted[0] + 3
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

const calculatePoints = (
  roll: number[],
  scoreKept: Partial<ScorePoints>
): ScorePoints => {
  return {
    one:
      scoreKept["one"] ||
      (scoreKept["one"] === 0
        ? 0
        : matching(1, roll.filter((die) => die === 1).length)),
    two:
      scoreKept["two"] ||
      (scoreKept["two"] === 0
        ? 0
        : matching(2, roll.filter((die) => die === 2).length)),
    three:
      scoreKept["three"] ||
      (scoreKept["three"] === 0
        ? 0
        : matching(3, roll.filter((die) => die === 3).length)),
    four:
      scoreKept["four"] ||
      (scoreKept["four"] === 0
        ? 0
        : matching(4, roll.filter((die) => die === 4).length)),
    five:
      scoreKept["five"] ||
      (scoreKept["five"] === 0
        ? 0
        : matching(5, roll.filter((die) => die === 5).length)),
    six:
      scoreKept["six"] ||
      (scoreKept["six"] === 0
        ? 0
        : matching(6, roll.filter((die) => die === 6).length)),
    threeOfAKind:
      scoreKept["threeOfAKind"] ||
      (scoreKept["threeOfAKind"] === 0 ? 0 : ofAKind(roll, "three")),
    fourOfAKind:
      scoreKept["fourOfAKind"] ||
      (scoreKept["fourOfAKind"] === 0 ? 0 : ofAKind(roll, "four")),
    shortStraight:
      scoreKept["shortStraight"] ||
      (scoreKept["shortStraight"] === 0 ? 0 : straight(roll, "short")),
    largeStraight:
      scoreKept["largeStraight"] ||
      (scoreKept["largeStraight"] === 0 ? 0 : straight(roll, "large")),
    fullHouse:
      scoreKept["fullHouse"] ||
      (scoreKept["fullHouse"] === 0 ? 0 : fullHouse(roll)),
    yatzi: scoreKept["yatzi"] || (scoreKept["yatzi"] === 0 ? 0 : yatzi(roll)),
    chance:
      scoreKept["chance"] ||
      (scoreKept["chance"] === 0 ? 0 : roll.reduce((acc, curr) => acc + curr)),
  };
};

const calculateTotals = (
  scoreKept: Partial<ScorePoints>,
  whichHalf: "top" | "bottom"
) => {
  switch (whichHalf) {
    case "top":
      const top: number[] = [
        scoreKept["one"] || 0,
        scoreKept["two"] || 0,
        scoreKept["three"] || 0,
        scoreKept["four"] || 0,
        scoreKept["five"] || 0,
        scoreKept["six"] || 0,
      ];
      let sumTop = top.reduce((acc, next) => acc + next);
      if (sumTop >= 65) sumTop = sumTop + 35;
      return sumTop;
    case "bottom":
      const bottom: number[] = [
        (scoreKept["threeOfAKind"] || 0) +
          (scoreKept["fourOfAKind"] || 0) +
          (scoreKept["shortStraight"] || 0) +
          (scoreKept["largeStraight"] || 0) +
          (scoreKept["fullHouse"] || 0) +
          (scoreKept["yatzi"] || 0) +
          (scoreKept["chance"] || 0),
      ];
      let sumBottom = bottom.reduce((acc, next) => acc + next);
      return sumBottom;
  }
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
  calculateTotals,
};
