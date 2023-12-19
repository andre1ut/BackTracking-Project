import React, { Component } from "react";
import NQueens from "../Andrei/nQueens/nQueens.jsx";
import { useRef, useEffect, useState } from "react";
import Sudoku from "../Matei/sudoku/sudoku.jsx";
import './App.css';
import ParticlesBg from 'particles-bg';

// const App = () => {

//     const [route, setRoute] = useState("home");


//     return (
//         <div>
//             <button onClick={() => setRoute("Matei")}>Matei</button>
//             <button onClick={() => setRoute("Andrei")}>Andrei</button>
//             {route === "Matei" ? <Sudoku /> : null}
//             {route === "Andrei" ? <h1>Andrei</h1> : null}
//         </div>
//     )
// }

class App extends Component {
    constructor() {
        super();
        this.state = {
            route: "home"
        }
    }

    routeChangeMatei = () => {
        this.setState({ route: "Matei" });
    }

    routeChangeAndrei = () => {
        this.setState({ route: "Andrei" });
    }

    render() {
        if(this.state.route === "home") {
            return(
                <>
                    <div className="parent">
                        <div> 
                            <center>
                                <button onClick={ this.routeChangeMatei } type="button" className="special btn btn-outline-primary">
                                    <h1>Matei Martin</h1>
                                </button>
                            </center>
                            <ParticlesBg type="circle" bg={true} />
                        </div>
                        <div>
                            <center>
                                <button onClick={ this.routeChangeAndrei }type="button" className="special btn btn-outline-primary"><h1>Andrei Dumitru-Munteanu</h1></button>
                                
                            </center>
                            <ParticlesBg type="tadpole" bg={true} />
                        </div>
                    </div>   
                </>
            )
        }

        if(this.state.route === "Matei") {
            return (
            <>
                <Sudoku />
                <ParticlesBg type="circle" bg={true} />
            </>
                )
        }

        if(this.state.route === "Andrei") {
            return <NQueens />
        }
    }
}

export default App;