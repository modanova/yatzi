import { useEffect, useState } from "react";
import "./App.css";
import Dice from "./components/Dice";

const rollNumber = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

const rollDice = () => {
  const dice = new Array(5).fill(0);
  return dice.map(rollNumber);
};

function App() {
  const [roll, setRoll] = useState<any[]>(rollDice());

  useEffect(() => {
    console.log(roll);
  }, [roll]);

  return (
    <div className="App">
      <div className="dice-row">
        {roll.map((rolled) => (
          <Dice pipsCount={rolled} />
        ))}
      </div>
      <div className="game-buttons">
        <button
          onClick={() => {
            setRoll(rollDice);
          }}
        >
          Roll
        </button>
      </div>
    </div>
  );
}

export default App;
