const Reloader = require("./reloader.js");

const watcher = (wsPort, compiler) => {
  const reloader = new Reloader(wsPort);

  const chokidar = require("chokidar");
  // this watches the files for changes to recompile and push the changes
  chokidar.watch("./src").on("all", async (event, path) => {
    switch (event) {
      case "change":
        console.log("File", path, "has been changed. Compiling...");
        await compiler.run();
        reloader.reload();
        reloader.report();
        break;
    }
  });
};

module.exports = watcher;
