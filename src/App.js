import "./App.css";
import React, { useState } from "react";

const SudokuSolver = () => {
  const initialBoard = [
    [2, 1, 9, null, 4, 6, null, 3, null],
    [null, null, 5, 1, null, null, null, null, null],
    [null, 3, 4, null, null, null, 2, 6, null],
    [null, 2, 6, null, null, 7, 5, null, 3],
    [null, null, 1, null, 9, null, null, null, 7],
    [4, 7, 3, null, 6, 5, null, null, 8],
    [null, 6, null, 4, null, 2, 3, 1, null],
    [3, 4, null, null, null, null, 7, 8, null],
    [1, null, null, null, null, null, 4, 5, null],
  ];

  const [board, setBoard] = useState(initialBoard);

  const generateTable = () => {
    return board.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((cell, columnIndex) => (
          <td key={columnIndex}>{cell === null ? "" : cell}</td>
        ))}
      </tr>
    ));
  };

  const updateBoard = () => {
    let updatedBoard = [...board];
    let hasArrays = false;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (updatedBoard[i][j] === null) {
          updatedBoard[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (Array.isArray(updatedBoard[i][j])) {
          hasArrays = true;

          const rowNumbers = updatedBoard[i].filter(
            (num) => typeof num === "number"
          );
          const columnNumbers = updatedBoard
            .map((row) => row[j])
            .filter((num) => typeof num === "number");

          const boxNumbers = [];
          const boxRow = Math.floor(i / 3);
          const boxColumn = Math.floor(j / 3);
          for (let k = boxRow * 3; k < boxRow * 3 + 3; k++) {
            for (let l = boxColumn * 3; l < boxColumn * 3 + 3; l++) {
              if (typeof updatedBoard[k][l] === "number") {
                boxNumbers.push(updatedBoard[k][l]);
              }
            }
          }

          updatedBoard[i][j] = updatedBoard[i][j].filter(
            (value) =>
              !rowNumbers.includes(value) &&
              !columnNumbers.includes(value) &&
              !boxNumbers.includes(value)
          );

          // Convert array to number if length is 1
          if (updatedBoard[i][j].length === 1) {
            updatedBoard[i][j] = updatedBoard[i][j][0];
          }
        }
      }
    }

    setBoard(updatedBoard);

    // Keep updating until no arrays left
    if (hasArrays) {
      updateBoard();
    }
  };

  return (
    <div>
      <button onClick={updateBoard}>Solve</button>
      <table id="sudokuTable">{generateTable()}</table>
    </div>
  );
};

export default SudokuSolver;
