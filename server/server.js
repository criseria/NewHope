const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();

dotenv.config()
const { PORT, MONGODB_URL } = process.env

// JSON 데이터 파싱
app.use(express.json());

// URL-encoded 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

mongoose.connect(MONGODB_URL, {
}).then(() => {
  console.log('MongoDB Connected...');
}).catch((err) => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send('awd')
})

app.use('/', routes);

// 서버 리스닝 
const port = PORT || 8000
app.listen(port, function () {
  console.log(`${port} 포트`);
})

