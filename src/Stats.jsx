import React from "react";
import "./Stats.css";

export default function Stats(props) {
  const style = {
    color: props.rollCount <= props.bestRollCount ? "#2b283a" : "red",
  };
  return (
    <div>
      <div className="stats-container">
        <p className="stats-info" style={style}>
          Roll count: {props.rollCount}
        </p>
        <p className="stats-info">
          Best roll count: {props.bestRollCount || "-"}
        </p>
        <p className="stats-info">Time: {props.time} seconds</p>
        {/* {props.finalTime && <p className="stats-info">Time: {props.finalTime} seconds </p>} */}
      </div>
    </div>
  );
}
