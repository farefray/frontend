var server = require("pushstate-server");

server.start({
  port: 80,
  host: "172.31.28.43",
  directory: "../dist",
  file: "/index.html"
});

console.log("> Serving server...\n");