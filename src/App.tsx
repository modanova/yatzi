import { useEffect, useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import Button from "@mui/material/Button";

const rollNumber = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

const rollDice = () => {
  const dice = new Array(5).fill(0);
  return dice.map(() => rollNumber());
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
  const [roll, setRoll] = useState<any[]>(rollDice());
  const [kept, setKept] = useState<string[]>([]);

  useEffect(() => {
    console.log(roll, kept);
  }, [roll, kept]);

  return (
    <div className="App">
      <div className="dice-row">
        {roll.map((rolled, i) => (
          <Dice
            pipsCount={rolled}
            id={i.toString()}
            onClick={(e) => {
              e.stopPropagation();
              const target = e.target as HTMLDivElement;
              keep(target?.id, kept, setKept);
            }}
          />
        ))}
      </div>
      <div className="game-buttons">
        <Button
          onClick={() => {
            setRoll(rollDice);
          }}
          variant="outlined"
          color="success"
        >
          Roll
        </Button>
      </div>
    </div>
  );
}

export default App;
