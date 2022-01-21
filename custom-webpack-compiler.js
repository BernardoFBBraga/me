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

const hydrationConfig = production ? clientConfig : devServerConfig;

const compile = () => {
  return new Promise((resolve, reject) => {
    serverCompiler.run(() => {
      console.log("Server compiled at", new Date().toLocaleTimeString());
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
          console.log("Client compiled at", new Date().toLocaleTimeString());
          clientCompiler.close(() =>
            serverCompiler.close(() => {
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
  app.use(serveStatic(__dirname + "/dist/web")).listen(8080, () => console.log("Server running on 8080..."));

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
}
