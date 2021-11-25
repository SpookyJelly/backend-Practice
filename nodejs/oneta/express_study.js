const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

app.set("port", process.env.PORT || 8080);

/* 공통 미들 웨어 */

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(cookieParser("SpookyJelly")); // 암호화된 쿠키를 사용하기 위한 임의의 문자 전송
app.use(
  session({
    secret: "spookyJelly112",
    resave: false,
    saveUninitialized: true,
    cookie: {
      //세션 쿠키 옵션을 설정, HTTPoNLY,EXPIRES,domain,path,secure,sameSite
      httpOnly: true,
    },
    // n",
    //name: 'connect.sid' <-- 세션 쿠키의 이름. 디폴트
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우팅 설정
app.get("/", (req, res) => {
  if (req.session.name) {
    const output = `<h2>${req.session.name}님 안녕하세요 </h2>`;
    res.send(output);
  } else {
    const output = `<h2>로그인 하지 않은 사용자입니다. </h2>`;
    res.send(output);
  }
});

app.get("/login", (req, res) => {
  console.log(req.session);
  // 쿠키를 사용할 경우 쿠키에 값 설정
  // res.cookie(name,value,options)
  // 세션 쿠키를 사용할 경우
  req.session.name = "connect.sid";
  res.send("O-K");
});

app.get("/logout", (req, res) => {
  res.clearCookie("connect.sid");
  res.end("Logout Ok");
});

// 서버와 포트 연결
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "빈 포트에서 서버 실행 중...");
});
