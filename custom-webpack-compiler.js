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

serverCompiler.run(() => {
  console.log("Server compiled");
  let static_render = "";
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
      console.log("Client compiled", __dirname);
      if (production) {
        clientCompiler.close(() => serverCompiler.close(() => {}));
      } else {
        connect()
          .use(serveStatic(__dirname + "/dist/web"))
          .listen(8080, () => console.log("Server running on 8080..."))
          .on("close", () => {
            clientCompiler.close(() => serverCompiler.close(() => {}));
          });
      }
    });
  });
});
