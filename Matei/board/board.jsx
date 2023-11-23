import React, { useRef, useState, useEffect } from 'react';
import './board.css';

const isValid = (board, row, col, c) => {

}

function solve(board) {

}

const Board = ({ sudokuMatrixOrder }) => {
    const [board, setBoard] = useState([])
    const [copyMatrix, setCopyMatrix] = useState(sudokuMatrixOrder)

    function showBord(memory_matrix) {
        let matrix = [];
        sudokuMatrixOrder.forEach((element, rowIndex) => {
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
                        ref={el => {
                            if (el > '0' && el <= '9')
                                board.current[rowIndex * sudokuMatrixOrder.length + i] = el
                        }}
                        onChange={e => {
                            const value = e.target.value;
                            if (value < 1 || value > 9) {
                                e.target.value = '';
                            }
                        }}

                    />
                );
            }));
        });
        return matrix;
    }

    useEffect(() => {
        setBoard(showBord(sudokuMatrixOrder))
    }, [])


    return (
        <div id="board">
            {board}
        </div>
    );
};

export default Board;