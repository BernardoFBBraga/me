const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const exec = require("child_process").exec;
const clean = require("./clean.js");
const [serverConfig, clientConfig, devServerConfig] = require("../../webpack.config.js");

const compile = async (production, SSRPath) => {
  const mode = production ? "production" : "development";

  await clean();

  return new Promise((resolve, reject) => {
    let t = process.hrtime();
    serverConfig.mode = mode;
    const serverCompiler = Webpack(serverConfig);
    serverCompiler.run(() => {
      exec(`node ${SSRPath}`, (err, stdout, stderr) => {
        if (stderr) {
          process.stderr.write(stderr);
          return;
        }
        const hydrationConfig = production ? clientConfig : devServerConfig;
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

module.exports = compile;
