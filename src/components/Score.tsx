import { Dispatch, SetStateAction } from "react";
import { calculateTopTotal } from "../helpers";

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
}

function ScoreBoard(props: BoardProps) {
  const { points } = props;
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
      onClick={(e: React.MouseEvent<HTMLTableElement, MouseEvent>) => {
        console.log(e.target);
        return true;
      }}
    >
      <tr>
        <th>Player</th>
        <th>Bob</th>
      </tr>
      <tr>
        <td>Ones</td>
        <td id="ones">{points["one"]}</td>
      </tr>
      <tr>
        <td>Twos</td>
        <td id="twos">{points["two"]} </td>
      </tr>
      <tr>
        <td>Threes</td>
        <td id="threes">{points["three"]} </td>
      </tr>
      <tr>
        <td>Fours</td>
        <td id="fours">{points["four"]} </td>
      </tr>
      <tr>
        <td>Fives</td>
        <td id="fives">{points["five"]} </td>
      </tr>
      <tr>
        <td>Sixes</td>
        <td id="sixes">{points["six"]} </td>
      </tr>
      <tr>
        <td>Top Total</td>
        <td>{topTotal}</td>
      </tr>
      <tr>
        <td>Three of a kind</td>
        <td id="threeOfAKind">{points["threeOfAKind"]} </td>
      </tr>
      <tr>
        <td>Four of a kind</td>
        <td id="fourOfAKind">{points["fourOfAKind"]} </td>
      </tr>
      <tr>
        <td>Short Straight</td>
        <td id="shortStraight">{points["shortStraight"]} </td>
      </tr>
      <tr>
        <td>Large Straight</td>
        <td id="largeStraight">{points["largeStraight"]} </td>
      </tr>
      <tr>
        <td>Full House</td>
        <td id="fullHouse">{points["fullHouse"]} </td>
      </tr>
      <tr>
        <td>Yatzi</td>
        <td id="yatzi">{points["yatzi"]} </td>
      </tr>
      <tr>
        <td>Chance</td>
        <td id="chance">{points["chance"]} </td>
      </tr>
      <tr>
        <td>Bottom Total</td>
        <td>{bottomTotal}</td>
      </tr>
      <tr>
        <td>All Total</td>
        <td>{topTotal + bottomTotal} </td>
      </tr>
    </table>
  );
}

export default ScoreBoard;
