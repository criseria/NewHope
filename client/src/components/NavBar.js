import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../components/NavBar.css';


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
    <div className='navbar-main'><br/>
      <div className="logo-container">
        <Link to='/mainpage'><h1 style={{color:'green'}}>New Hope</h1></Link>
        <a href='/mainpage'><img src='Newlogo.jpg'></img></a>
      </div>
        <div className="mnavbar" style={{color:'black'}} >
          <Link to='/intro' style={{color:'black'}}> 소개</Link>
          <Link to="/animal" style={{color:'black'}}>유기동물소개</Link>
          <Link to='/board' style={{color:'black'}}> 게시판</Link>
          <p></p><p></p>
    
          <Link to="/register" style={{color:'black'}}>회원가입 </Link>
          {isLoggedIn ? (
              <>
              <Link to="/Mypage" style={{color:'black'}}>Mypage</Link>
              <button className="logoutbtn" onClick={handleLogout} style={{fontSize: '18px'}}>로그아웃</button>
              </>
          ) : (
              <Link to="/login" style={{color:'black'}}>
                로그인
              </Link>
            )}
      </div><br/>
    </div>
  );
};

export default NavBar;