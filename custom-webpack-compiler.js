const WebSocket = require("ws");
const Webpack = require("webpack");
const connect = require("connect");
const serveStatic = require("serve-static");
const [serverConfig, clientConfig, devServerConfig] = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const exec = require("child_process").exec;
const myArgs = process.argv.slice(2);
const production = myArgs[0] === "prod";
const mode = production ? "production" : "development";
serverConfig.mode = mode;
const serverCompiler = Webpack(serverConfig);

console.log("Running in", production ? "production" : "dev", "mode");
const hydrationConfig = production ? clientConfig : devServerConfig;

const compile = () => {
  return new Promise((resolve, reject) => {
    let t = process.hrtime();
    serverCompiler.run(() => {
      exec(`node ${__dirname + "/dist/server/static_render.bundle.js"}`, (err, stdout, stderr) => {
        if (stderr) {
          process.stderr.write(stderr);
          return;
        }
        hydrationConfig.mode = mode;
        hydrationConfig.plugins.push(
          new HtmlWebpackPlugin({
            title: "Bernardo Braga",
            template: `src/index.ejs`,
            templateParameters: {
              static_render: stdout,
            },
          })
        );

        const clientCompiler = Webpack(hydrationConfig);
        clientCompiler.run(() => {
          clientCompiler.close(() =>
            serverCompiler.close(() => {
              t = process.hrtime(t);
              console.log(
                "Compiled in %d.%d s at %s",
                t[0],
                String(t[1]).substring(0, 4),
                new Date().toLocaleTimeString()
              );
              resolve();
            })
          );
        });
      });
    });
  });
};

compile();

if (!production) {
  // we use chokidar because fs recursive watch doesn't work for linux
  const chokidar = require("chokidar");

  // this serves the bundle
  const app = connect();
  const port = 8080;
  app.use(serveStatic(__dirname + "/dist/web")).listen(port, () => console.log("Server running on 8080..."));

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
  chokidar.watch("./src").on("all", (event, path) => {
    switch (event) {
      case "change":
        console.log("File", path, "has been changed. Compiling...");
        compile().then(() => {
          sockets.forEach((s) => s.send("Please reload!"));
          console.log(sockets.length, `tab${sockets.length === 1 ? "" : "s"} updated`);
        });
        break;
    }
  });

  const open = require("open");
  open(`http://localhost:${port}`);
}
