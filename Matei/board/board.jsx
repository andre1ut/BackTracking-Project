import React, { useRef, useState, useEffect } from 'react';
import './board.css';

const isValid = (board, row, col, c) => {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] !== '0' && board[i][col] === c) return false;
        if (board[row][i] !== '0' && board[row][i] === c) return false;
        if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] !== '0' &&
            board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === c) return false;
    }
    return true;
}

function solve(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++)
            if (board[i][j] === '0') {
                for (let c = 1; c <= 9; c++) {
                    if (isValid(board, i, j, c.toString())) {
                        board[i][j] = c.toString();
                        if (solve(board)) return true;
                        else board[i][j] = '0';
                    }
                }
                return false;
            }
    }
    return true;
}

function canBeSolved(board) {
    if (board == null || board.length == 0)
        return false;
    for (let i = 0; i < 9; i++) {
        let row = new Set(),
            col = new Set(),
            box = new Set();

        for (let j = 0; j < 9; j++) {
            let rowVal = board[i][j];
            let colVal = board[j][i];
            let boxVal = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];

            if (rowVal !== '0') {
                if (row.has(rowVal)) return false;
                row.add(rowVal);
            }
            if (colVal !== '0') {
                if (col.has(colVal)) return false;
                col.add(colVal);
            }
            if (boxVal !== '0') {
                if (box.has(boxVal)) return false;
                box.add(boxVal);
            }
        }
    }
    return true;
}

const Board = ({ sudokuMatrixOrder }) => {
    const [board, setBoard] = useState([]);//The inputs (visual board)
    const [memoryMatrix, setMemoryMatrix] = useState([]);//The matrix that we will use to solve the sudoku
    const [isSolvable, setIsSolvable] = useState(false);//The matrix that we will use to solve the sudoku
    useEffect(() => {
        let matrix = [];
        sudokuMatrixOrder.forEach((element, rowIndex) => {
            let row = [];
            element.forEach((item, i) => {
                row.push(item.class);
            });
            matrix.push(row);
        }
        );
        setMemoryMatrix(matrix);
        // console.log("memory_matrix -> ", matrix);
    }, []);//This useEffect will run only once, when the component is mounted and will set the memory_matrix state


    useEffect(() => {
        setBoard(translateBoard_fromMemory_toInputs(memoryMatrix));
        setIsSolvable(canBeSolved(memoryMatrix));
        // console.log("isSolvable -> ", canBeSolved(memoryMatrix));
    }, [memoryMatrix]);



    function translateBoard_fromMemory_toInputs(memory_matrix) {
        let matrix = [];
        memory_matrix.forEach((element, rowIndex) => {
            matrix.push(element.map((item, i) => {
                let className = "square";
                if ((rowIndex + 1) % 3 === 0 && rowIndex !== 8)
                    className += " bottom-border";

                if ((i + 1) % 3 === 0 && i !== 8)
                    className += " right-border";

                return (
                    <input
                        type="text"
                        className={className.trim()} // Trim the className string
                        key={i}
                        value={Number(item) !== 0 ? item : ''}
                        onChange={e => {
                            const value = e.target.value;
                            let newBoard = memoryMatrix.map(arr => [...arr]); // Create a new deep copy of memory_matrix
                            if (value === '') {
                                newBoard[rowIndex][i] = '0'; // Set the class to 0 when the input is empty
                            } else if (Number(value) >= 1 && Number(value) <= 9) {
                                newBoard[rowIndex][i] = value.toString();
                            }
                            setMemoryMatrix(newBoard); // Update the state of memory_matrix
                            console.log("memory_matrix_after_input_change -> ", newBoard);
                        }}
                    />
                );
            }));
        });
        console.log("Translated board: ", matrix);
        return matrix;
    }

    function solveSudoku() {
        if (memoryMatrix == null || memoryMatrix.length == 0)
            return;
        let matrix = memoryMatrix.map(arr => [...arr]); // Create a deep copy of memoryMatrix
        solve(matrix);
        console.log("memory_matrix_before_solved -> ", memoryMatrix);
        console.log("memory_matrix_after_solved -> ", matrix);
        setMemoryMatrix(matrix);
        setBoard(translateBoard_fromMemory_toInputs(matrix));
    }


    return (
        <div id="fullboard">
            <div id="board">
                {[...board]}
            </div>
            {isSolvable === true ? <button className='solve-btn' onClick={solveSudoku}>Solve</button> : <h1 className='error-msg'>The sudoku cannot be solved</h1>}
        </div>
    );
};

export default Board;