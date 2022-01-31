const reloader = require("./reloader.js");

const watcher = (wsPort, compiler) => {
  const rl = reloader(wsPort);

  const chokidar = require("chokidar");
  // this watches the files for changes to recompile and push the changes
  chokidar.watch("./src").on("all", async (event, path) => {
    switch (event) {
      case "change":
        console.log("File", path, "has been changed. Compiling...");
        await compiler.run();
        rl.reload();
        rl.report();
        break;
    }
  });
};

module.exports = watcher;
