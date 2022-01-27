const fs = require("fs");

const clean = (path) =>
  new Promise((resolve, reject) => {
    fs.rm(path + "/", { recursive: true, force: true }, () => {
      resolve();
    });
  });

module.exports = clean;
