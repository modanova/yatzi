import { Dispatch, SetStateAction, useState } from "react";
import { calculateTopTotal } from "../helpers";
import "./score.styles.css";

export type SameNumber = 1 | 2 | 3 | 4 | 5 | 6;
export type SameNumberWords = "one" | "two" | "three" | "four" | "five" | "six";

export type YatziBonus =
  | "threeOfAKind"
  | "fourOfAKind"
  | "shortStraight"
  | "shortStraight"
  | "largeStraight"
  | "fullHouse"
  | "yatzi"
  | "chance";

export type ScorePoints = {
  [key in YatziBonus | SameNumberWords]: number;
};

interface BoardProps {
  points: ScorePoints;
  scoreKept: Partial<ScorePoints>;
  setScoreKept: Dispatch<SetStateAction<Partial<ScorePoints>>>;
  turnOver: boolean;
  setTurnOver: Dispatch<React.SetStateAction<Partial<boolean>>>;
}

function ScoreBoard(props: BoardProps) {
  const { points, scoreKept, setScoreKept, turnOver, setTurnOver } = props;

  const topTotal = calculateTopTotal([
    points["one"] +
      points["two"] +
      points["three"] +
      points["four"] +
      points["five"] +
      points["six"],
  ]);
  const bottomTotal =
    points["threeOfAKind"] +
    points["fourOfAKind"] +
    points["shortStraight"] +
    points["largeStraight"] +
    points["fullHouse"] +
    points["yatzi"] +
    points["chance"];

  return (
    <table
      className="table"
      onClick={(e: React.MouseEvent<HTMLTableElement, MouseEvent>) => {
        if (turnOver) return;
        const id = (e?.target as HTMLTableElement)?.id;
        if (id && id in points) {
          console.log(id);
          console.log(points[id as SameNumberWords]);

          if (id in scoreKept) {
            console.log(scoreKept[id as SameNumberWords]);
            return;
            // if you click in this one - do nothing
          }
          setScoreKept((score) => ({
            ...score,
            [id as SameNumberWords]: points[id as SameNumberWords] || "/",
          }));
          setTurnOver(true);
        }
        return true;
      }}
    >
      <tr>
        <th>Player</th>
        <th>Bob</th>
      </tr>
      <tr>
        <td>Ones</td>
        <td
          className={`${"one" in scoreKept ? "kept-score" : "score-option"}`}
          id="one"
        >
          {points["one"]}
        </td>
      </tr>
      <tr>
        <td>Twos</td>
        <td
          className={`${"two" in scoreKept ? "kept-score" : "score-option"}`}
          id="two"
        >
          {points["two"]}
        </td>
      </tr>
      <tr>
        <td>Threes</td>
        <td
          className={`${"three" in scoreKept ? "kept-score" : "score-option"}`}
          id="three"
        >
          {points["three"]}
        </td>
      </tr>
      <tr>
        <td>Fours</td>
        <td
          className={`${"four" in scoreKept ? "kept-score" : "score-option"}`}
          id="four"
        >
          {points["four"]}
        </td>
      </tr>
      <tr>
        <td>Fives</td>
        <td
          className={`${"five" in scoreKept ? "kept-score" : "score-option"}`}
          id="five"
        >
          {points["five"]}
        </td>
      </tr>
      <tr>
        <td>Sixes</td>
        <td
          className={`${"six" in scoreKept ? "kept-score" : "score-option"}`}
          id="six"
        >
          {points["six"]}
        </td>
      </tr>
      <tr>
        <td>Top Total</td>
        <td className="totals">{topTotal}</td>
      </tr>
      <tr>
        <td>Three of a kind</td>
        <td
          className={`${
            "threeOfAKind" in scoreKept ? "kept-score" : "score-option"
          }`}
          id="threeOfAKind"
        >
          {points["threeOfAKind"]}
        </td>
      </tr>
      <tr>
        <td>Four of a kind</td>
        <td
          className={`${
            "fourOfAKind" in scoreKept ? "kept-score" : "score-option"
          }`}
          id="fourOfAKind"
        >
          {points["fourOfAKind"]}
        </td>
      </tr>
      <tr>
        <td>Short Straight</td>
        <td
          className={`${
            "shortStraight" in scoreKept ? "kept-score" : "score-option"
          }`}
          id="shortStraight"
        >
          {points["shortStraight"]}
        </td>
      </tr>
      <tr>
        <td>Large Straight</td>
        <td
          className={`${
            "largeStraight" in scoreKept ? "kept-score" : "score-option"
          }`}
          id="largeStraight"
        >
          {points["largeStraight"]}
        </td>
      </tr>
      <tr>
        <td>Full House</td>
        <td
          className={`${
            "fullHouse" in scoreKept ? "kept-score" : "score-option"
          }`}
          id="fullHouse"
        >
          {points["fullHouse"]}
        </td>
      </tr>
      <tr>
        <td>Yatzi</td>
        <td
          className={`${"yatzi" in scoreKept ? "kept-score" : "score-option"}`}
          id="yatzi"
        >
          {points["yatzi"]}
        </td>
      </tr>
      <tr>
        <td>Chance</td>
        <td
          className={`${"chance" in scoreKept ? "kept-score" : "score-option"}`}
          id="chance"
        >
          {points["chance"]}
        </td>
      </tr>
      <tr>
        <td>Bottom Total</td>
        <td className="totals">{bottomTotal}</td>
      </tr>
      <tr>
        <td>All Total</td>
        <td className="totals">{topTotal + bottomTotal} </td>
      </tr>
    </table>
  );
}

export default ScoreBoard;
