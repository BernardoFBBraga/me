const WebSocket = require("ws");
const connect = require("connect");
const serveStatic = require("serve-static");
const compile = require("./tools/webpack/compile.js");

const myArgs = process.argv.slice(2);
const production = myArgs[0] === "prod";

const distPath = __dirname + "/dist";
const SSRPath = distPath + "/server/static_render.bundle.js";
const webServerPath = distPath + "/web";


console.log("Running in", production ? "production" : "dev", "mode");

const run = async () => {
  await compile(production, SSRPath);

  if (!production) {
    // we use chokidar because fs recursive watch doesn't work for linux
    const chokidar = require("chokidar");

    // this serves the bundle
    const app = connect();
    const port = 8080;
    app.use(serveStatic(webServerPath)).listen(port, () => console.log(`Server running on ${port}...`));

    // this is a web socket to tell the app to reload when there are changes

    const server = new WebSocket.Server({
      port: 8082,
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

    // this watches the files for changes to recompile and push the changes
    chokidar.watch("./src").on("all", async (event, path) => {
      switch (event) {
        case "change":
          console.log("File", path, "has been changed. Compiling...");
          await compile(production, SSRPath);
          sockets.forEach((s) => s.send("Please reload!"));
          console.log(sockets.length, `tab${sockets.length === 1 ? "" : "s"} updated`);
          break;
      }
    });
    const open = require("open");
    open(`http://localhost:${port}`);
  }
};

run();
