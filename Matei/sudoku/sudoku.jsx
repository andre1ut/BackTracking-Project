import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Board from "../board/board";

const Sudoku = () => {

    const fileInput = useRef();
    const [data, setData] = useState(null);
    const [sudokuMatrixOrder, setSudokuMatrixOrder] = useState([]);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result
                    .replace("data:", "")
                    .replace(/^.+,/, "");

                const img = new Image();
                img.onload = function () {
                    // Log the image size
                    console.log('Image Width: ' + this.width + ', Image Height: ' + this.height);
                };
                img.src = reader.result;

                axios({
                    method: "POST",
                    url: "https://detect.roboflow.com/sodoku-2/1",
                    params: {
                        api_key: "zFBhhnpseoexwI9vK8LJ",
                    },
                    data: base64String,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                })
                    .then(function (response) {
                        setData(response.data);
                        console.log(response.data);
                        if (response.data.predictions.length === 81) {
                            response.data.predictions.sort((a, b) => a.y - b.y);

                            let matrix = [];
                            let row = [];
                            for (let i = 0; i < response.data.predictions.length - 1; i++) {
                                row.push(response.data.predictions[i]);

                                if (response.data.predictions[i + 1].y - response.data.predictions[i].y > response.data.predictions[i].height - 10 || i === response.data.predictions.length - 2) {

                                    row.sort((a, b) => a.x - b.x);
                                    matrix.push(row);
                                    row = [];
                                }
                            }
                            matrix[8].push(response.data.predictions[80]);
                            setSudokuMatrixOrder(matrix);

                            console.log(matrix);
                        }

                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
            };


            reader.readAsDataURL(file);
            fileInput.current.value = "";
        }
    };



    return (
        <div>
            <input type="file" id="Form" ref={fileInput} onChange={handleFileChange} />
            {(data !== null && data?.predictions.length === 81) && (
                <div>
                    <h1>Is ok</h1>
                    <Board sudokuMatrixOrder={sudokuMatrixOrder} />
                </div>

            )}
            {(data !== null && data?.predictions.length !== 81) && (


                <h1>Not ok</h1>

            )}
        </div>
    );

};

export default Sudoku;