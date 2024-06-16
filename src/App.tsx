import { useEffect, useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import Button from "@mui/material/Button";

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

function App() {
  const [roll, setRoll] = useState<any[]>(rollDiceNew());
  const [kept, setKept] = useState<string[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [round, setRound] = useState<number>(0);

  useEffect(() => {
    console.log(roll, kept, round);
  }, [roll, kept, round]);

  return (
    <div className="App">
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
        <Button
          onClick={() => {
            setRoll(rollDiceNew);
            setKept([]);
            setTurns(1);
          }}
          variant="outlined"
          color="success"
        >
          Roll new
        </Button>
        <Button
          onClick={() => {
            if (turns === 3) {
              setRoll(rollDiceNew);
              setKept([]);
              setTurns(1);
              setRound((round) => round + 1);
              return;
            }
            setRoll(() => rollDice(roll, kept));
            setTurns((turns) => turns + 1);
          }}
          variant="outlined"
        >
          Roll available only
        </Button>
      </div>
    </div>
  );
}

export default App;
