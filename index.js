const express = require("express"); // express 모듈을 가져옴
const app = express(); // 새 앱을 만듦
const port = process.env.PORT || 5000; // 백 서버 포트 설정
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // 로그인 토큰을 쿠키에 저장하기

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); // 바디파서가 클라이언트에서 오는 정보를 분석해서 가져올 수 있도록

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    //  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // 루트 디렉토리에 라우트
  res.send("Hello World!~~ from.root"); // 출력
});

app.use("/api/users", require("./routes/users"));
app.use("/api/bookstore", require("./routes/bookstore"));
//app.use('/api/tag', require('./routes/tag'));
app.use("/api/review", require("./routes/review"));
app.use("/api/like", require("./routes/like"));
app.use("/api/favorite", require("./routes/favorite"));
app.use("/api/admin", require("./routes/admin")); // 관리자용 라우터
app.use("/api/guestbook", require("./routes/guestbook"));

/* 이미지 */
app.use("/public", express.static("public"));
// 정적(static) 파일을 손쉽게 제공하기 위해 사용한다. express.static 을 사용하지 않으면,
// 정적 파일이 존재하는 path 로 접근하기 위한 코드가 번거롭고 복잡하게 된다.
// static 의 인자로 디렉토리명을 전달하며, 해당 디렉토리 경로의 데이터들은
// 웹브라우저의 요청에 따라 서비스를 제공할 수 있다.
// 해당 디렉토리에 접근할 때에도 해당 경로를 static 경로로 지정해야 한다.

app.listen(port, () => {
  // 포트(port)에서 실행
  console.log(`Example app listening on port ${port}`);
});
