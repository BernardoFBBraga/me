import React from "react";
import { hydrate } from "react-dom";
import App from "../components/App";

const element = document.body.querySelector(".root");

hydrate(<App />, element);
