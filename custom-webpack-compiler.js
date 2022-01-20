const Webpack = require("webpack");
const connect = require("connect");
const serveStatic = require("serve-static");
const [serverConfig, clientConfig] = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const exec = require("child_process").exec;
const myArgs = process.argv.slice(2);
const production = myArgs[0] === "prod";
const mode = production ? "production" : "development";
serverConfig.mode = mode;
const serverCompiler = Webpack(serverConfig);

const compile = () => {
  serverCompiler.run(() => {
    console.log("Server compiled at", new Date().toLocaleTimeString());
    exec(`node ${__dirname + "/dist/server/static_render.bundle.js"}`, (err, stdout, stderr) => {
      if (stderr) {
        process.stderr.write(stderr);
        return;
      }
      clientConfig.mode = mode;
      clientConfig.plugins.push(
        new HtmlWebpackPlugin({
          title: "Bernardo Braga",
          template: `src/index.ejs`,
          templateParameters: {
            static_render: stdout,
          },
        })
      );

      const clientCompiler = Webpack(clientConfig);
      clientCompiler.run(() => {
        console.log("Client compiled at", new Date().toLocaleTimeString());
        clientCompiler.close(() => serverCompiler.close(() => {}));
      });
    });
  });
};

compile();

if (!production) {
  // we use chokidar because fs recursive watch doesn't work for linux
  const chokidar = require("chokidar");

  const app = connect();
  app.use(serveStatic(__dirname + "/dist/web")).listen(8080, () => console.log("Server running on 8080..."));

  chokidar.watch("./src").on("all", (event, path) => {
    switch (event) {
      case "change":
        compile();
        break;
    }
  });
}
