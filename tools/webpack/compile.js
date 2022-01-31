const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const exec = require("child_process").exec;
const clean = require("./clean.js");
const [serverConfig, clientConfig, devServerConfig] = require("../../webpack.config.js");

class Compiler {
  constructor(SSRPath, devMode = false) {
    this.SSRPath = SSRPath;
    const mode = devMode ? "development" : "production";
    this.serverConfig = { ...serverConfig };
    this.serverConfig.mode = mode;
    this.hydrationConfig = devMode ? { ...devServerConfig } : { ...clientConfig };
    this.hydrationConfig.mode = mode;
  }

  async run() {
    await clean();

    return new Promise((resolve, reject) => {
      let t = process.hrtime();

      const serverCompiler = Webpack(this.serverConfig);
      serverCompiler.run(() => {
        exec(`node ${this.SSRPath}`, (err, stdout, stderr) => {
          if (stderr) {
            process.stderr.write(stderr);
            return;
          }

          this.hydrationConfig.plugins.push(
            new HtmlWebpackPlugin({
              title: "Bernardo Braga",
              template: `src/index.ejs`,
              templateParameters: {
                static_render: stdout,
              },
            })
          );

          const clientCompiler = Webpack(this.hydrationConfig);
          this.hydrationConfig.plugins.pop();
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
  }
}

module.exports = Compiler;
