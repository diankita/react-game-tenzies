import React from "react";
import "./Die.css";

export default function Die(props) {
  return (
    <div
      className={`dice ${props.held ? "held" : ""}`}
      onClick={props.holdDice}
    >
      <div className="dice-num">{props.value}</div>
    </div>
  );
}
