import React, { useEffect, useState } from "react";
import Square from "../components/Square";
type Player = "X" | "O" | "BOTH" | null;
const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

  const setSquareValue = (index: number) => {
    const newData = squares.map((squareValue, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return squareValue;
    });
    setSquares(newData);
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
  };

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) setWinner(winner);
    if (!winner && !squares.filter((square) => !square).length)
      setWinner("BOTH");
  });

  return (
    <div>
      <p>Hey {currentPlayer}, it is your turn</p>
      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Square
                winner={winner}
                key={i}
                onClick={() => {
                  setSquareValue(i);
                }}
                value={squares[i]}
              />
            );
          })}
      </div>
      <button className="reset" onClick={() => reset()}>
        RESET
      </button>
    </div>
  );
};
export default Board;
