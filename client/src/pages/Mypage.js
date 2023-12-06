import React, { useEffect, useState } from 'react';
import useMyPageData from '../hooks/useMypage';
import { Link, useNavigate } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import './Mypage.css';

function MyPage() {
  const { userName, userEmail, userPostcode, userAddress, userDetailAddress, userPhoneNum } = useMyPageData();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await fetcher('get', '/auth/getUserInfo');
        setUserInfo(userId);

      } catch (error) {
        alert('로그인이 필요한 서비스입니다!');
        navigate('/login')
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <div className="my-page-container">
      <div className="sidebar">
        <Link to="/passwordVerification" className="sidebar-link">정보 수정</Link>
        <Link to="/Mypage/DeleteAccount" className="sidebar-link">회원 탈퇴</Link>
      </div>
      <table className="user-info-table">
        <tbody>
          <tr>
            <td colSpan="2" className="greeting"><strong>{`NewHope에 방문해주신 ${userName} 님 안녕하세요~`}</strong></td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{userEmail}</td>
          </tr>
          <tr>
            <td>우편번호</td>
            <td>{userPostcode}</td>
          </tr>
          <tr>
            <td>주소</td>
            <td>{userAddress}</td>
          </tr>
          <tr>
            <td>상세주소</td>
            <td>{userDetailAddress}</td>
          </tr>
          <tr>
            <td>핸드폰번호</td>
            <td>{userPhoneNum}</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default MyPage;