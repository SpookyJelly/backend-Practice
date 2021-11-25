const express = require("express");
const app = express();

app.set("port", process.env.PORT || 8080);
app.use(express.static(__dirname + "/public"));

// 문자열이 그대로 박혀서 전송되어 그대로 body에 노출된다. head나 meta 같은 내용은 아무것도 적혀있지 않음

/*
res.send() = 문자열 응답
res.json() = json 객체 응답
res.render() = jade,pug와 같은 템플릿 랜더링 응답
res.sendFile() = 파일로 응답


*/
app.get("/", (req, res) => {
  const outPut = `
  <h2>express 마스터가 되기</h2>
  <p>메인 페이지입니다</p>
  <img src='./test.png' alt='' width='400px' height='200px'/>
  `;
  res.send(outPut);
});

// : 붙이면 그냥 params로 인식하네, template backtick 사용하지 않아도 된다.
app.get("/user/:id", (req, res) => {
  res.send(req.params.id + "님의 개인 페이지입니다.");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port") + "에서 실행중");
});
