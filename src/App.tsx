import { useEffect, useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import Button from "@mui/material/Button";
import ScoreBoard, { ScorePoints } from "./components/Score";
import { calculatePoints, keep, rollDice, rollDiceNew } from "./helpers";

function App() {
  const [roll, setRoll] = useState<any[]>(rollDiceNew());
  const [kept, setKept] = useState<number[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [round, setRound] = useState<number>(0);

  const [scoreKept, setScoreKept] = useState<Partial<ScorePoints>>({
    one: 6,
    four: 12,
  });
  const [scoreOptions, setScoreOptions] = useState<ScorePoints>(
    calculatePoints(roll, scoreKept)
  );

  const [turnOver, setTurnOver] = useState<boolean>(false);

  // useEffect(() => {
  // console.log(roll, kept, turns, round)
  // }, [roll, kept, turns, round]);

  return (
    <div className="App">
      <div className="score-board">
        <ScoreBoard
          points={scoreOptions}
          scoreKept={scoreKept}
          setScoreKept={setScoreKept}
          turnOver={turnOver}
          setTurnOver={setTurnOver}
        />
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
              keep(parseInt(target?.id), kept, setKept);
            }}
            className={kept.includes(i) ? "kept" : ""}
          />
        ))}
      </div>
      <div className="game-buttons">
        {turns < 3 && !turnOver && (
          <Button
            onClick={() => {
              if (turns === 3) {
                const newRoll = rollDiceNew();
                setRoll(newRoll);
                setKept([]);
                setTurns(1);
                setRound((round) => round + 1);
                setScoreOptions(calculatePoints(newRoll, scoreKept));
                return;
              }
              const newRoll = rollDice(roll, kept);
              setRoll(newRoll);
              setScoreOptions(calculatePoints(newRoll, scoreKept));
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
            setScoreOptions(calculatePoints(newRoll, scoreKept));
            setTurnOver(false);
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
