import React, { useState, useEffect } from 'react';

const QueenSolver = ({ n }) => {
  const [solutions, setSolutions] = useState([]);
  const [currentBoard, setCurrentBoard] = useState([]);
  
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (isRunning)
      return;
    
    setIsRunning(true);

    console.log(`USE EFFECT ${n}`)

    const isSafe = (board, row, col) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') return false;
        if (board[i][col - row + i] === 'Q') return false;
        if (board[i][col + row - i] === 'Q') return false;
      }
      return true;
    };

    const isSameSolution = (solution1, solution2) => {
      for (let i = 0; i < solution1.length; i++) {
        for (let j = 0; j < solution1[i].length; j++) {
          if (solution1[i][j] !== solution2[i][j]) {
            console.log(`BBBBBBBBBB ${solution1[i][j]} ${solution2[i][j]}`);
            return false;
          }
        }
      }

      console.log("AAAAAAAA");

      return true;
    };

    const solveNQueens = async (board, row) => {
      if (row === n) {
        const solution = board.map(row => row.slice());

        // solutions.some(existingSolution => isSameSolution(existingSolution, solution));
        let original = true;
        for (sol in solutions) {
          let test = !isSameSolution(sol, solution);
          console.log(`${test} IS SAME: ${sol} ${solution}`)

          if (test) {
            original = false;
            break;
          }
        }

        if (original) {
          console.log(`added sol: ${solution}`)
          setSolutions(prevSolutions => [...prevSolutions, solution]);
        }
        return;
      }

      for (let col = 0; col < n; col++) {
        if (isSafe(board, row, col)) {
          board[row][col] = 'Q';
          setCurrentBoard(board.map(row => row.slice()));
          await new Promise(resolve => setTimeout(resolve, 500)); // Adjust delay as needed
          await solveNQueens(board, row + 1);
          board[row][col] = '.';
          setCurrentBoard(board.map(row => row.slice()));
          await new Promise(resolve => setTimeout(resolve, 500)); // Adjust delay as needed
        }
      }
    };

    const initialBoard = Array.from({ length: n }, () => Array(n).fill('.'));
    setCurrentBoard(initialBoard.map(row => row.slice()));
    
    const runSolve = async () => {
      await solveNQueens(initialBoard, 0);
      setIsRunning(true);
    }

    runSolve();

    // Cleanup function to clear solutions when unmounting
    return () => {
      setSolutions([]);
      setCurrentBoard([]);
    };
  }, [n]);

  return (
    <div style={{ overflow: 'auto', maxHeight: '400px' }}>
      {currentBoard.length > 0 && (
        <div style={{ margin: '20px' }}>
          <h3>Current Board</h3>
          <Chessboard board={currentBoard} />
        </div>
      )}
      {solutions.map((solution, index) => (
        <div key={index} style={{ margin: '20px' }}>
          <h3>Solution {index + 1}</h3>
          <Chessboard board={solution} />
        </div>
      ))}
    </div>
  );
};

const Chessboard = ({ board }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${board.length}, 50px)` }}>
    {board.map((row, rowIndex) => (
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#eee' : '#ddd',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {cell === 'Q' && <span style={{ fontSize: '20px' }}>♛</span>}
        </div>
      ))
    ))}
  </div>
);

export default QueenSolver;
