import { useEffect, useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import Button from "@mui/material/Button";
import ScoreBoard, { ScorePoints } from "./components/Score";
import { calculatePoints } from "./helpers";

const rollNumber = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

const rollDiceNew = () => {
  const dice = new Array(5).fill(0);
  return dice.map(() => rollNumber());
};

const rollDice = (roll: number[], kept: string[]) => {
  return roll.map((die, i) => {
    if (kept.includes(i.toString())) return die;
    return rollNumber();
  });
};

const keep = (
  index: string,
  kept: string[],
  setKept: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const newKept = [...kept];
  if (newKept.includes(index)) {
    newKept.splice(newKept.indexOf(index), 1);
  } else {
    newKept.push(index);
  }
  setKept(newKept.sort().filter(Boolean));

  return [];
};

const matching = (number: number, amount: number) => {
  return number * amount;
};

const ofAKind = (roll: number[], size: "three" | "four") => {
  const sorted: number[] = roll.sort();
  if (new Set(sorted).size === 2) {
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
  const sorted = Array.from(new Set(roll.sort()));
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
  const sorted: number[] = roll.sort();
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

function App() {
  const [roll, setRoll] = useState<any[]>(rollDiceNew());
  const [kept, setKept] = useState<string[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [scoreOptions, setScoreOptions] = useState<ScorePoints>(
    calculatePoints(roll)
  );

  useEffect(() => {
    console.log(roll, kept, turns, round);
  }, [roll, kept, turns, round]);

  return (
    <div className="App">
      <div className="score-board">
        <ScoreBoard points={scoreOptions} />
      </div>
      <div className="dice-row">
        <p>Turns left: {3 - turns}</p>
        {roll.map((rolled, i) => (
          <Dice
            pipsCount={rolled}
            id={i.toString()}
            onClick={(e) => {
              e.stopPropagation();
              const target = e.target as HTMLDivElement;
              keep(target?.id, kept, setKept);
            }}
            className={kept.includes(i.toString()) ? "kept" : ""}
          />
        ))}
      </div>
      <div className="game-buttons">
        {turns < 3 && (
          <Button
            onClick={() => {
              if (turns === 3) {
                const newRoll = rollDiceNew();
                setRoll(newRoll);
                setKept([]);
                setTurns(1);
                setRound((round) => round + 1);
                setScoreOptions(calculatePoints(newRoll));
                return;
              }
              const newRoll = rollDice(roll, kept);
              setRoll(newRoll);
              setScoreOptions(calculatePoints(newRoll));
              setRound((round) => round + 1);
              setTurns((turns) => turns + 1);
            }}
            variant="outlined"
          >
            Roll available only
          </Button>
        )}
        <Button
          onClick={() => {
            const newRoll = rollDiceNew();
            setRoll(newRoll);
            setKept([]);
            setTurns(1);
            setRound((round) => round + 1);
            setScoreOptions(calculatePoints(newRoll));
          }}
          variant="outlined"
          color="success"
        >
          Roll new
        </Button>
      </div>
    </div>
  );
}

export default App;
