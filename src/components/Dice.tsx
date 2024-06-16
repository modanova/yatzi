import "./styles.css";

function Dice(props: { pipsCount: number }) {
  const pips = new Array(props.pipsCount).fill(<span className="pip"></span>);
  return <div className="face">{pips}</div>;
}

export default Dice;
