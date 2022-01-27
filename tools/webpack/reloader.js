const WebSocket = require("ws");
const reloader = (port = 8082) => {
  // this is a web socket to tell the app to reload when there are changes
  const server = new WebSocket.Server({
    port,
  });
  let sockets = [];
  server.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Socket connected.", sockets.length, "connected tabs");
    socket.on("close", () => {
      sockets = sockets.filter((s) => s !== socket);
      console.log("Socket disconnected.", sockets.length, "remaining");
    });
  });

  return {
    reload: () => {
      sockets.forEach((s) => s.send("Please reload!"));
    },
    report: () => {
      console.log(sockets.length, `tab${sockets.length === 1 ? "" : "s"} updated`);
    },
  };
};

module.exports = reloader;
