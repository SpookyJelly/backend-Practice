// 처음 서버를 만드는 설정
// express 인스턴스를 사용하겠다는 코드
// node js 에서는 import 대신에 require를 쓴다. import를 쓰는 방법이 있다고는 하는데 아직 이해할 수준이 안된다
// package.json에서 type을 모듈로 지정해두면 뭐가 된다고 같은데, 일단 그냥 해보자
var express = require("express");
// import express from "express";
var router = express.Router(); // express 프레임워크 라우터를 사용하기 위한 변수 선언

router.get("/", function (req, res, next) {
  res.render("form", { name: "알파", blog: "감마", homepage: "인프라 블랙" });
});

//method를 post로 전송하니까 post로 받아야한다.
// 같은 루트로 접근된다고 해도, post인지 get인지에 따라 용례가 달라진다
router.post("/", function (req, res, next) {
  res.json(req.body); // 해당 데이터를 Json 함수가 폼의 데이터를 Json으로 바꿔준다
});

module.exports = router;
// export default router
