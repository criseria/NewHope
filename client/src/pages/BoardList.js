import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import Footer from "../components/Footer";

export const BoardList = () => {
  const [boardDataList, setBoardDataList] = useState([]);


  const fetchData = async () => {
    try {
      const response = await fetcher('get', '/board/board/boardlist');
      setBoardDataList(response.data);
    if (response && response.data) {
      setBoardDataList(response.data);
    } else {
      console.error('게시글 목록 데이터가 없습니다.');
    }
    } catch (error) {
      console.error('게시글 목록을 불러오는 중 오류 발생:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 align="center">게시글 목록</h2>
      <div className="board-list-wrapper">
        {boardDataList && boardDataList.map((board) => (
          <div className="board-list-item">
            <h3>{board.title}</h3>
            <p>{board.content}</p>
            <p>작성자: {board.username}</p>
            <Link to={`/board/${board.id}`}>자세히 보기</Link>
          </div>
        ))}
        <Footer/>
      </div>
    </>
  );
}

export default BoardList;


