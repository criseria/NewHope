const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/signup');
const loginRouter =  require('./routes/user'); 
const cors = require('cors');

const app = express();

// JSON 데이터 파싱
app.use(express.json());

// URL-encoded 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// mongoose 설정 코드
const MONGODB_URL = 'mongodb+srv://criseria4212:870619@ .wdbhk9n.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URL, {
}).then(()=>{
    console.log('MongoDB Connected...');
}).catch((err)=>{
    console.log(err);
});

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'))
})


app.use('/', userRouter);
app.use('/', loginRouter);


// 서버 리스닝 
app.listen(8080, function(){
    console.log('8080포트 서버 정상 작동중');
})

