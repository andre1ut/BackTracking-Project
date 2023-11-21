import React, { useRef } from 'react';
import './board.css';

const Board = ({ sudokuMatrixOrder }) => {
    const board = useRef([]);

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
                    value={Number(item.class) !== 0 ? item.class : ''}
                />
            );
        }));
    });

    board.current = matrix;

    return (
        <div id="board">
            {board.current}
        </div>
    );
};

export default Board;