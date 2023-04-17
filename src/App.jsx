import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Stats from "./Stats";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const bestRollCount = localStorage.getItem("bestRollCount");
  const [start, setStart] = useState(false);
  const [trackedTime, setTrackedTime] = useState(0);
  const [activeTimer, setActiveTimer] = useState(false);
  // const [initialTime, setInitialTime] = useState(0);
  // const [finalTime, setFinalTime] = useState(null);

  // check if the player has won the game & save roll count
  useEffect(() => {
    setActiveTimer(true);
    const checkConditions = dice.every(
      (item) => item.isHeld && item.value === dice[0].value
    );
    if (checkConditions) {
      setTenzies(true);
      setActiveTimer(false);
      // setFinalTime((Date.now() - initialTime) / 1000);

      if (!bestRollCount || rollCount < bestRollCount) {
        localStorage.setItem("bestRollCount", rollCount);
      }
    }
  }, [dice]);

  // values used for each new die
  function diceData() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // creating an array with 10 new dice
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(diceData());
    }
    return newDice;
  }

  // rolling the dice that aren't held & start counting the rolls
  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((element) => {
          return element.isHeld ? element : diceData();
        })
      );
      countRolls();
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setRollCount(0);
      setTrackedTime(0);
    }
  }

  // hold a die that the player clicked on based on its id
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((element) => {
        return id === element.id
          ? { ...element, isHeld: !element.isHeld }
          : element;
      })
    );
  }

  function countRolls() {
    setRollCount((prevCount) => prevCount + 1);
  }

  function startGame() {
    setStart(true);
    setTrackedTime(0);
    setActiveTimer(true);
    // trackTime();
  }

  useEffect(() => {
    let timer = null;
    if (activeTimer) {
      timer = setInterval(() => {
        setTrackedTime((oldTrackedTime) => oldTrackedTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [activeTimer, trackedTime]);

  // count the elapsed time
  // function trackTime() {
  //   setInitialTime(Date.now());
  // }

  // variables with elements rendered on the page
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      held={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const startElements = (
    <button className="btn" onClick={startGame}>
      Start game
    </button>
  );

  const gameElements = (
    <div>
      <div className="dice-container">{diceElements}</div>
      <button className="btn" onClick={rollDice}>
        {tenzies ? "New game" : "Roll"}
      </button>
      <Stats
        rollCount={rollCount}
        bestRollCount={bestRollCount}
        time={trackedTime}
        // finalTime={finalTime}
      />
    </div>
  );

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      {start ? gameElements : startElements}
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
