import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import { useAuth } from '../contexts/AuthContext';

const BoardContent = () => {
  const [boardContent, setBoardContent] = useState({});
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetcher('get', `/board/board/${id}`, { withCredentials: true });
        setBoardContent(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetail();
  }, [id]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await fetcher('get', '/auth/getUserInfo');
        setUserId(userId.userName);
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchUserInfo();
  }, []);


  const handleDeletePost = async () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        await fetcher('delete', `/board/board/delete/${id}`, null, { withCredentials: true });
        console.log('게시물이 성공적으로 삭제되었습니다.');
        window.location.href = '/board';
      } catch (error) {
        console.error('게시물 삭제 중 오류 발생:', error);
      }
    } else {
      console.log('삭제가 취소되었습니다.');
    }
  };

  return (
    <div>
      <h2>게시물 상세 페이지</h2>
      <p>제목: {boardContent.title}</p>
      <p>작성자: {boardContent.userName}</p>
      <p>작성날짜: {boardContent.boardDate}</p>
      <p>내용: {boardContent.content}</p>


        <img src={`http://localhost:8080/${boardContent.file}`} alt="Uploaded" style={{ maxWidth: '100%' }} />

      {/* 작성자와 로그인된 사용자 정보의 userName이 일치할 때만 보이도록 설정 */}
      {userId === boardContent.userName && (
        <button type="button" onClick={handleDeletePost}>
          게시물 삭제
        </button>
      )}

      <Link to={`/board/update/${id}`}>수정하기</Link>
      <Link to={'/board'}>목록으로</Link>
    </div>
  );
};

export default BoardContent;