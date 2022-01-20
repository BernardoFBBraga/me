import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App";

console.log(ReactDOMServer.renderToString(<App />));
