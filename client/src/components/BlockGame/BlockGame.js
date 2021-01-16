import React, { useRef, useEffect } from "react";
import io from "socket.io-client";

import "./BlockGame.scss";

const BlockGame = () => {
  const canvasRef = useRef(null);
  const socket = io("http://localhost:3001", { transport: ["websocket"] });

  const move = (direction) => {
    socket.emit("move", direction);
  };

  const resetGame = () => {
    socket.emit("reset");
  };

  useEffect(() => {
    const canvasObj = canvasRef.current;
    console.log(canvasObj);
    const ctx = canvasObj.getContext("2d");

    socket.on("position", (data) => {
      ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
      ctx.fillRect(data.x, data.y, 20, 20);
    });
  }, [canvasRef, socket]);

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.keyCode) {
        case 38:
          move("up");
          break;
        case 40:
          move("down");
          break;
        case 37:
          move("left");
          break;
        case 39:
          move("right");
          break;
        default:
          break;
      }
      console.log(e.keyCode);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  });

  return (
    <div className="game">
      <canvas ref={canvasRef} width="660" height="500" />
      <button onClick={() => resetGame()}>Reset</button>
    </div>
  );
};

export default BlockGame;
