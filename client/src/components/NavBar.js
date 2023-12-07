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
    <div className='navbar-main'><br/>
      <div className="logo-container">
        <Link to='/mainpage'><h1 style={{color:'green'}}>New Hope</h1></Link>
        {/* <img src='dogcat.png' width={108} height={63.75}></img> */}
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