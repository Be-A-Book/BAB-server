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

// 회원가입 라우트
app.post("/api/users/register", (req, res) => {
  // 회원가입 시 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다

  const user = new User(req.body); // json 객체가 들어 있음 (bodyparser 이용)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// 로그인 라우트
app.post("/api/users/login", (req, res) => {
  // 요청된 이메일이 DB에 있는지 찾는다

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //  이메일이 있다면 비밀번호가 맞는 비밀번호인지 확인
    // comparePassword() 메소드는 User 스키마에 만든다
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 매개변수 user로 받아온 토큰을 저장한다.
        // 어디에? (개발자 임의로) 쿠키, 로컬스토리지, 세션스토리지 등등...
        // 쿠키에 저장하기: cookie-parser 라이브러리
        res
          .cookie("x_auth", user.token) // x_auth 변수에 토큰 저장됨
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // 미들웨어를 통과해 여기까지 왔다는 얘기는 Authentication이 true라는 말.
  // 미들웨어에서 req.user = user 해줘서 여기서 쓸 수 있음
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => {
  // 포트(port)에서 실행
  console.log(`Example app listening on port ${port}`);
});
