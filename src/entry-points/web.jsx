import "../style.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";

const element = document.body.querySelector(".root");

ReactDOM.hydrate(<App />, element);
