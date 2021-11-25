// HTTP 모듈 로드
var http = require("http");

var server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plan" });
  response.end("Hello World!");
});

server.listen(7070);

console.log("server running");
