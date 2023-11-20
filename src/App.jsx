import React from "react";
import { useRef, useEffect, useState } from "react";
import Sudoku from "../Matei/sudoku.jsx";

const App = () => {

    const [route, setRoute] = useState("home");

   
    return (
        <div>
            <button onClick={() => setRoute("home")}>Home</button>
            <button onClick={() => setRoute("Matei")}>Matei</button>
            <button onClick={() => setRoute("Andrei")}>Andrei</button>
            {route === "home" ? <h1>Home</h1> : null}
            {route === "Matei" ? <Sudoku /> : null}
            {route === "Andrei" ? <h1>Andrei</h1> : null}
        </div>
    )
}

export default App;