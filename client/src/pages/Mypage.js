import React from 'react';
import useMyPageData from '../hooks/useMypage';
import { Link } from 'react-router-dom';

function MyPage() {
  const { userName, userEmail, userPostcode, userAddress, userDetailAddress, userPhoneNum } = useMyPageData();

  return (
    <div>
      <div>
        <p>{`${userName} 님 안녕하세요.`}</p>
        <p>{`이메일 : ${userEmail}`}</p>
        <p>{`우편번호 : ${userPostcode}`}</p>
        <p>{`주소 : ${userAddress}`}</p>
        <p>{`상세주소 : ${userDetailAddress}`}</p>
        <p>{`핸드폰번호 : ${userPhoneNum}`}</p>
      </div>
      
      <div className="sidebar">
        <Link to="/passwordVerification">정보 수정</Link>
        <Link to="/Mypage/DeleteAccount">회원 탈퇴</Link>
      </div>
    </div>
  );
}

export default MyPage;