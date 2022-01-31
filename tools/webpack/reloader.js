const WebSocket = require("ws");

// This helper class creates a web socket to tell the app to reload when there are changes
class Reloader {
  constructor(port) {
    this.server = new WebSocket.Server({
      port: port || 8082,
    });
    this.sockets = [];
    this.server.on("connection", (socket) => {
      this.sockets.push(socket);
      console.log("Socket connected.", this.sockets.length, "connected tabs");
      socket.on("close", () => {
        this.sockets = this.sockets.filter((s) => s !== socket);
        console.log("Socket disconnected.", this.sockets.length, "remaining");
      });
    });
  }

  reload() {
    this.sockets.forEach((s) => s.send("Please reload!"));
  }

  report() {
    console.log(this.sockets.length, `tab${this.sockets.length === 1 ? "" : "s"} updated`);
  }
}

module.exports = Reloader;
