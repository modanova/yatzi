type YatziBonus =
  | number
  | "topTotal"
  | "shortStraight"
  | "largeStraight"
  | "fullHouse"
  | "yatzi"
  | "bottomTotal";

type ScorePoints = {
  [key in YatziBonus]?: number;
};

function ScoreBoard(scorePoints: ScorePoints) {
  return (
    <table>
      <tr>
        <th>Player</th>
        <th>Bob</th>
      </tr>
      <tr>
        <td>Ones</td>
        <td>{scorePoints[1] || 0} </td>
      </tr>
      <tr>
        <td>Twos</td>
        <td>{scorePoints[2] || 0} </td>
      </tr>
      <tr>
        <td>Threes</td>
        <td>{scorePoints[3] || 0} </td>
      </tr>
      <tr>
        <td>Fours</td>
        <td>{scorePoints[4] || 0} </td>
      </tr>
      <tr>
        <td>Fives</td>
        <td>{scorePoints[5] || 0} </td>
      </tr>
      <tr>
        <td>Sixes</td>
        <td>{scorePoints[6] || 0} </td>
      </tr>
      <tr>
        <td>Top Total</td>
        <td>
          {scorePoints[1] ||
            0 + scorePoints[2] ||
            0 + scorePoints[3] ||
            0 + scorePoints[4] ||
            0 + scorePoints[5] ||
            0 + scorePoints[6] ||
            0}
        </td>
      </tr>
      <tr>
        <td>Short Straight</td>
        <td>{scorePoints["shortStraight"] || 0} </td>
      </tr>
      <tr>
        <td>Large Straight</td>
        <td>{scorePoints["largeStraight"] || 0} </td>
      </tr>
      <tr>
        <td>Full House</td>
        <td>{scorePoints["fullHouse"] || 0} </td>
      </tr>
      <tr>
        <td>Yatzi</td>
        <td>{scorePoints["yatzi"] || 0} </td>
      </tr>
      <tr>
        <td>Bottom Total</td>
        <td>
          {scorePoints["shortStraight"] +
            scorePoints["largeStraight"] +
            scorePoints["fullHouse"] +
            scorePoints["yatzi"] +
            scorePoints["bottomTotal"] || 0}{" "}
        </td>
      </tr>
      <tr>
        <td>All Total</td>
        <td>{scorePoints["topTotal"] + scorePoints["bottomTotal"] || 0} </td>
      </tr>
    </table>
  );
}

export default ScoreBoard;
