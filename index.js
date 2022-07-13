const express = require("express"); // express 모듈을 가져옴
const app = express(); // 새 앱을 만듦
const port = process.env.PORT || 5000; // 백 서버 포트 설정
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // 로그인 토큰을 쿠키에 저장하기
const { auth } = require("./middleware/auth"); // auth
const { User } = require("./models/User"); // 유저 모델 가져오기 (회원가입을 위함)

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

app.listen(port, () => {
  // 포트(port)에서 실행
  console.log(`Example app listening on port ${port}`);
});
