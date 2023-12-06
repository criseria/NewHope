import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetcher } from '../utils/fetcher';



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
    <div>
      <Link to="/animal">유기동물소개</Link>
      <Link to='/mainpage'> 메인</Link>
      <Link to='/intro'> 소개</Link>
      <Link to='/board'> 게시판</Link>
      <Link to="/animal"> 유기동물소개</Link>
      <p></p>
      <Link to="/register">회원가입</Link>
      <p></p>
      {isLoggedIn ? (
        <>
          <Link to="/Mypage">Mypage</Link>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <Link to="/login">
          로그인
        </Link>
      )}
    </div>
  );
};

export default NavBar;