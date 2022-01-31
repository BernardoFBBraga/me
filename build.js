const Compiler = require("./tools/webpack/Compiler.js");
const serve = require("./tools/webpack/serve.js");
const watcher = require("./tools/webpack/watcher.js");
const open = require("open");

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
  // use webpack's node API to compile
  await compiler.run();

  if (devMode) {
    // start a local server to host the files
    serve(webServerPath, port);

    // watch for any file change to re-compile
    // and update the browser tab via socket
    watcher(wsPort, compiler);

    // open a new tab for the user
    open(`http://localhost:${port}`);
  }
};

run();
