import React from 'react';
import './App.css';
import { Route , Routes } from 'react-router-dom';
import Signup from './signup';
import LoginPage from './login';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>이곳은 테스트용 페이지 입니다.</h1>
      <Link to="/signup">회원가입</Link>
      <p></p>
      <Link to="/login">로그인</Link>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
