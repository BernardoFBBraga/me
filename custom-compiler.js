const Compiler = require("./tools/webpack/compile.js");
const serve = require("./tools/webpack/serve.js");
const watcher = require("./tools/webpack/watcher.js");

const myArgs = process.argv.slice(2);
const devMode = myArgs[0] === "dev";

const distPath = __dirname + "/dist";
const SSRPath = distPath + "/server/static_render.bundle.js";
const webServerPath = distPath + "/web";
const port = 8080;
const wsPort = 8082;

console.log("Running in", devMode ? "dev" : "production", "mode");

const compiler = new Compiler(SSRPath, devMode);

const run = async () => {
  await compiler.run();

  if (devMode) {
    serve(webServerPath, port);

    watcher(wsPort, compiler);

    const open = require("open");
    open(`http://localhost:${port}`);
  }
};

run();
