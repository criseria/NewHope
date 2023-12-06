const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const cors = require('cors');
const dotenv = require('dotenv')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

dotenv.config()
const { PORT, MONGODB_URL } = process.env

// express-session 설정
app.use(session({
  secret: 'd9fd93jf9d93kjkfd3dfsafddsa',
  resave: false,
  saveUninitialized: true,
  cookie: {
    //한시간
    maxAge: 3600000,
    httpOnly: true,
  },
}));

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// JSON 데이터 파싱
app.use(express.json());

// URL-encoded 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// cookie-parser 설정
app.use(cookieParser());

mongoose.connect(MONGODB_URL, {
}).then(() => {
  console.log('MongoDB Connected...');
}).catch((err) => {
  console.log(err);
});

// 정적 파일 경로 설정
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('awd')
})

app.use('/', routes);

// 서버 리스닝 
const port = PORT || 8080
app.listen(port, function () {
  console.log(`${port} 포트`);
})

app.post('/board', (req, res) => {
  // Handle POST logic here
});
