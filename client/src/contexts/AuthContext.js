import React, { createContext, useContext, useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시에 로컬 스토리지에서 로그인 정보를 가져와서 상태에 설정
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
  }, []);

  const login = () => {
    // 로그인 시에 로컬 스토리지에 로그인 정보 저장
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    navigate('/');
    setIsLoggedIn(true);
  };

  const logout = () => {
    // 로그아웃 시에 로컬 스토리지에서 로그인 정보 제거
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};