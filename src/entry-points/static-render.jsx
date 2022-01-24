import React from "react";
import { renderToString } from "react-dom/server";
import App from "../components/App";

process.stdout.write(renderToString(<App />));
