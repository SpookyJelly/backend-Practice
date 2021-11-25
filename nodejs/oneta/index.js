const express = require("express");
const app = express();
app.set("port", process.env.PORT || 8080);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 실행중");
});

// app.listen(8000, () => {
//   console.log("8000 번에서 실행중");
// });
