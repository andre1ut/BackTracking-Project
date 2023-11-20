import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Sudoku = () => {

    const fileInput = useRef();
    const [data, setData] = useState(null);

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
                        console.log(response.data);
                        setData(response.data);
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

                <h1>Is ok</h1>

            )}
            {(data !== null && data?.predictions.length !== 81) && (


                <h1>Not ok</h1>

            )}
        </div>
    );

};

export default Sudoku;