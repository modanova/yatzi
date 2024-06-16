import { HTMLProps } from "react";
import "./styles.css";

interface DiceProps extends HTMLProps<HTMLDivElement> {
  pipsCount: number;
}

function Dice(props: DiceProps) {
  const { pipsCount, ...attributes } = props;
  const pips = new Array(pipsCount).fill(<span className="pip"></span>);
  return (
    <div className="face" {...attributes}>
      {pips}
    </div>
  );
}

export default Dice;
