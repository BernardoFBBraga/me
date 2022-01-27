const compile = require("./tools/webpack/compile.js");
const serve = require("./tools/webpack/serve.js");
const reloader = require("./tools/webpack/reloader.js");

const myArgs = process.argv.slice(2);
const production = myArgs[0] === "prod";

const distPath = __dirname + "/dist";
const SSRPath = distPath + "/server/static_render.bundle.js";
const webServerPath = distPath + "/web";
const port = 8080;
const wsPort = 8082;

console.log("Running in", production ? "production" : "dev", "mode");

const run = async () => {
  await compile(production, SSRPath);

  if (!production) {
    serve(webServerPath, port);

    const rl = reloader(wsPort);

    const chokidar = require("chokidar");
    // this watches the files for changes to recompile and push the changes
    chokidar.watch("./src").on("all", async (event, path) => {
      switch (event) {
        case "change":
          console.log("File", path, "has been changed. Compiling...");
          await compile(production, SSRPath);
          rl.reload();
          rl.report();
          break;
      }
    });
    const open = require("open");
    open(`http://localhost:${port}`);
  }
};

run();
