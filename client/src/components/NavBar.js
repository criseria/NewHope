import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    logout();
    navigate('/');
    document.cookie = 'dkfjdkfjaksfjddksjf3232=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // 쿠키 삭제 후 콘솔로그로 확인
    // console.log(document.cookie);
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