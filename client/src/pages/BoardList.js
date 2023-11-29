import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';

function BoardList() {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('get', '/board/boardlist');
        setBoardData(response.data);
      if (response && response.data) {
        setBoardData(response.data);
      } else {
        console.error('게시글 목록 데이터가 없습니다.');
      }
      } catch (error) {
        console.error('게시글 목록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 align="center">게시글 목록</h2>
      <div className="board-list-wrapper">
        {boardData && boardData.map((board) => (
          <div key={board.id} className="board-list-item">
            <h3>{board.title}</h3>
            <p>{board.content}</p>
            <p>작성자: {board.username}</p>
            <Link to={`/board/${board.id}`}>자세히 보기</Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default BoardList;