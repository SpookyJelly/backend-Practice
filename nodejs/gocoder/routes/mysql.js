var express = require("express");
var router = express.Router();
var mysql = require("mysql"); // mysql 인스턴스 가져오기

router.get("/", function (req, res, next) {
  // createConeection 함수로 설치된 DB의 접속 정보
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gocodemysql",
    database: "nodedb",
  });

  //connect 함수는 해당 커넥션 정보를 이용해 DB에 접속 시도, 오루 발생시 err에 오류 정보가 담김
  connection.connect(function (err) {
    // err이 존재한다면 에러매시지 발싸
    if (err) {
      res.render("mysql", { connect: "연결 실패", err: err });
      console.error(err);
      throw err;
    } else {
      res.render("mysql", { connect: "연결 성공", err: "없음" });
    }
  });
  connection.end();
});

module.exports = router;
