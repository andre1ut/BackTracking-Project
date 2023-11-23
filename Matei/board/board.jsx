import React, { useRef, useState, useEffect } from 'react';
import './board.css';

const isValid = (board, row, col, c) => {
    for (let i = 0; i < 9; i++) {
        if (board[i][col].class === String(c))
            return false;
        if (board[row][i].class === String(c))
            return false;
        if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3].class === String(c))
            return false;
    }
    return true;
}

function solve(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].class === '0') {
                for (let c = 1; c <= 9; c++) {
                    if (isValid(board, i, j, c)) {
                        board[i][j].class = c.toString();
                        if (solve(board))
                            return true;
                        else
                            board[i][j].class = '0';
                    }
                }
                return false;
            }
        }
    }
    return true;
}



const Board = ({ sudokuMatrixOrder }) => {
    const [board, setBoard] = useState([]);
    const [memoryMatrix, setMemoryMatrix] = useState(sudokuMatrixOrder);


  

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
                        defaultValue={Number(item.class) !== 0 ? item.class : ''}
                        onChange={e => {
                            const value = e.target.value;
                            let newBoard = [...memoryMatrix]; // Create a new copy of memory_matrix
                            if (value === '') {
                                newBoard[rowIndex][i].class = '0'; // Set the class to 0 when the input is empty
                            } else if (Number(value) >= 1 && Number(value) <= 9) {
                                newBoard[rowIndex][i].class = value.toString();
                            }
                            setMemoryMatrix(newBoard); // Update the state of memory_matrix
                        }}
                    />
                );
            }));
        });
        return matrix;
    }

    function solveSudoku() {
        if (memoryMatrix == null || memoryMatrix.length == 0)
            return;
        let copyMatrix = JSON.parse(JSON.stringify(memoryMatrix))
        console.log("memory_matrix -> ", memoryMatrix);
        solve(copyMatrix);
        setMemoryMatrix(copyMatrix);
        console.log("copyMatrix -> ", copyMatrix);
        //Everithing works here everythoing we need to do is display the board
        setBoard(translateBoard_fromMemory_toInputs(copyMatrix));
    }

    useEffect(() => {
        setBoard(translateBoard_fromMemory_toInputs(sudokuMatrixOrder))
    }, [])

    useEffect(() => {
        setBoard(translateBoard_fromMemory_toInputs(memoryMatrix));
    }, [memoryMatrix]);



    return (
        <>
            <div id="board">
                {board}
            </div>
            <button className='solve-btn' onClick={solveSudoku}>Solve</button>
        </>
    );
};

export default Board;