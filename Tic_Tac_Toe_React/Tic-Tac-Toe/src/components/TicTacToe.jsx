import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";

const TicTacToe = () => {
  let data = ["", "", "", "", "", "", "", "", ""];
  let [count, SetCount] = useState(0);
  let [lock, SetLock] = useState(false);
  let titleRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }
    if (count % 2 == 0) {
      e.target.innerHTML = `<img src=${cross} alt="" />`;
      data[num] = "X";
      SetCount(++count);
      checkWin();
    } else {
      e.target.innerHTML = `<img src=${circle} alt="" />`;
      data[num] = "0";
      SetCount(++count);
      checkWin();
    }
  };

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    }

    if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    }

    if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    }

    if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    }

    if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    }

    if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    }

    if (data[0] === data[4] && data[4] === data[8] && data[4] !== "") {
      won(data[4]);
    }

    if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  };

  const won = (winner) => {
    SetLock(true);
    if (winner === "X") {
      titleRef.current.innerHTML = `Congratulations your winner is <img src=${cross} alt="" />`;
    } else {
      titleRef.current.innerHTML = `Congratulations your winner is <img src=${circle} alt="" />`;
    }
  };

  const reset = () => {
    SetLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = `Tic Tac Toe <span>InReact</span>`;
    box_array.map((e) => e.current.innerHTML = "")
  };

  let ref = useRef("X");
  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe <span>InReact</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 0);
            }}
            ref={box1}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 1);
            }}
            ref={box2}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 2);
            }}
            ref={box3}
          ></div>
        </div>
        <div className="row2">
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 3);
            }}
            ref={box4}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 4);
            }}
            ref={box5}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 5);
            }}
            ref={box6}
          ></div>
        </div>
        <div className="row3">
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 6);
            }}
            ref={box7}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 7);
            }}
            ref={box8}
          ></div>
          <div
            className="boxes"
            onClick={(e) => {
              toggle(e, 8);
            }}
            ref={box9}
          ></div>
        </div>
      </div>
      <button
        className="reset"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
