import "./style.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";

const element = document.body.querySelector("[data-reactroot]");

ReactDOM.hydrate(<App />, element);
