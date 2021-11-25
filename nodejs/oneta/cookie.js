const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Set-cookie": "name=roadBook" });
    console.log(req.headers.cookie);
    res.end("Cookie --> Header");
  })
  .listen(8080, () => {
    console.log("8080 포트에서 실행중 ");
  });
