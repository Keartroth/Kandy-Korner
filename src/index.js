import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import KandyKorner from "./components/KandyKorner"
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
        <KandyKorner />
    </Router>
    , document.getElementById("root"))