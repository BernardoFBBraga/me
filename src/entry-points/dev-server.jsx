import React, { useEffect } from "react";
import { hydrate } from "react-dom";
import App from "../components/App";

const element = document.body.querySelector(".root");

const AutoUpdaterSocket = () => {
  useEffect(() => {
    const webSocket = new WebSocket(`ws://${window.location.hostname}:8082`);
    console.log("Trying to connect to dev-server");
    webSocket.onopen = (e) => {
      console.log("Connected to dev-server!");
      webSocket.send("Browser connected!");
    };
    webSocket.onmessage = (e) => {
      console.log("received message:", e.data);
      location.reload();
    };
    return () => {
      webSocket.send("closing connection!");
      webSocket.close();
    };
  });
  return <App />;
};

hydrate(<AutoUpdaterSocket />, element);
