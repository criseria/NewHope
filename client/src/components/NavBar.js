import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetcher } from '../utils/fetcher';

import '../components/NavBar.css';


const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {

    try {
      const data = await fetcher('post', '/auth/logout');

      alert(data.message);
      logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div className='navbar-main'><br />
      <div className="logo-container">
        <Link to='/mainpage'><h1 style={{ color: 'green', marginLeft: '60px', marginBottom:'50px' }}>New Hope</h1></Link>
        <a href='/mainpage'><img src='Newlogo.jpg'></img></a>
      </div>
      <div className="mnavbar" style={{ color: 'black' }} >
        <Link to='/intro' style={{ color: 'black' }}> 소개</Link>
        <Link to="/animal" style={{ color: 'black' }}>유기동물소개</Link>
        <Link to='/board' style={{ color: 'black' }}> 게시판</Link>
        <Link to='/product' style={{ color: 'black' }}>봉사활동티켓</Link>
        <p></p><p></p>
        {isLoggedIn ? (
          <div className="dropdown">
            <button className="dropbtn" style={{ color: 'black' }}> <Link to="/Mypage" style={{ color: 'black' }}>Mypage</Link></button>
            <div className="dropdown-content">
              <Link to="/passwordVerification">정보 수정</Link>
              <Link to="/Mypage/DeleteAccount">회원 탈퇴</Link>
              <Link to="/cart">장바구니</Link>
              <Link to="/ordersuccessfully">구매 내역</Link>
            </div>
          </div>
        ) : (
          <>
            <Link to="/register" style={{ color: 'black' }}>회원가입</Link>
            <Link to="/login" style={{ color: 'black' }}>로그인</Link>
          </>
        )}

        {isLoggedIn && (
          <button className="logoutbtn" onClick={handleLogout} style={{ fontSize: '18px', marginLeft: '10px' }}>
            로그아웃
          </button>
        )}
      </div><br />
    </div>
  );
};

export default NavBar;