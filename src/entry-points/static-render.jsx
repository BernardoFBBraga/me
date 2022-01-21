import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App";

process.stdout.write(ReactDOMServer.renderToString(<App />));
