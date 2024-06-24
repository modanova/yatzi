import { calculateTopTotal } from "../helpers";

type YatziBonus =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | "three"
  | "four"
  | "shortStraight"
  | "shortStraight"
  | "largeStraight"
  | "fullHouse"
  | "yatzi"
  | "chance";

export type ScorePoints = {
  [key in YatziBonus]: number;
};

interface BoardProps {
  points: ScorePoints;
}

function ScoreBoard(props: BoardProps) {
  const { points } = props;
  const topTotal = calculateTopTotal([
    points[1] + points[2] + points[3] + points[4] + points[5] + points[6],
  ]);
  const bottomTotal =
    points["three"] +
    points["four"] +
    points["shortStraight"] +
    points["largeStraight"] +
    points["fullHouse"] +
    points["yatzi"] +
    points["chance"];
  return (
    <table>
      <tr>
        <th>Player</th>
        <th>Bob</th>
      </tr>
      <tr>
        <td>Ones</td>
        <td
          onClick={(e) => {
            console.log(e.target.innerText);
          }}
        >
          {points[1]}{" "}
        </td>
      </tr>
      <tr>
        <td>Twos</td>
        <td>{points[2]} </td>
      </tr>
      <tr>
        <td>Threes</td>
        <td>{points[3]} </td>
      </tr>
      <tr>
        <td>Fours</td>
        <td>{points[4]} </td>
      </tr>
      <tr>
        <td>Fives</td>
        <td>{points[5]} </td>
      </tr>
      <tr>
        <td>Sixes</td>
        <td>{points[6]} </td>
      </tr>
      <tr>
        <td>Top Total</td>
        <td>{topTotal}</td>
      </tr>
      <tr>
        <td>Three of a kind</td>
        <td>{points["three"]} </td>
      </tr>
      <tr>
        <td>Four of a kind</td>
        <td>{points["four"]} </td>
      </tr>
      <tr>
        <td>Short Straight</td>
        <td>{points["shortStraight"]} </td>
      </tr>
      <tr>
        <td>Large Straight</td>
        <td>{points["largeStraight"]} </td>
      </tr>
      <tr>
        <td>Full House</td>
        <td>{points["fullHouse"]} </td>
      </tr>
      <tr>
        <td>Yatzi</td>
        <td>{points["yatzi"]} </td>
      </tr>
      <tr>
        <td>Chance</td>
        <td>{points["chance"]} </td>
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
