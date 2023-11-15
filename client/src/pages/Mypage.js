import React from 'react';
import useMyPageData from '../hooks/useMypage';
import { Link } from 'react-router-dom';

function MyPage() {
  const {userName} = useMyPageData(); 

  return (
    <div>
      <p>{`${userName} 님 안녕하세요.`}</p>
      <div className="sidebar">
        <Link to="/passwordVerification">정보 수정</Link>
        <Link to="/Mypage/DeleteAccount">회원 탈퇴</Link>
      </div>
    </div>
  );
}

export default MyPage;