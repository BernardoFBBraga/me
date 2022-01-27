const connect = require("connect");
const serveStatic = require("serve-static");

const serve = (path, port = 8080) => {
  // this serves the bundle
  const app = connect();
  app.use(serveStatic(path)).listen(port, () => console.log(`Server running on ${port}...`));
};

module.exports = serve;
