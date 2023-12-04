import React, { useEffect, useState } from 'react';
import BoardHeader from '../components/BoardHeader';
import { Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';

function Board() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetcher('get', '/board/board', { withCredentials: true });
        console.log(res);

        const processedData = res.map(item => ({
          _id: item._id,
          userName: item.userName,
          title: item.title,
          categoryId: item.categoryId,
        }));

        setData(processedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // 선택한 카테고리에 기반하여 게시물 필터링
  const filteredData = selectedCategory === 'all' ? data : data.filter(item => item.categoryId === selectedCategory);

  return (
    <>
      <div className="board-container">
        <h2>게시판 목록</h2>
        <Link to='/board/boardcreate'>
            <button align="right">
              글 작성
            </button>
        </Link>
        <div>
          <button onClick={() => setSelectedCategory('all')}>전체보기</button>
          <button onClick={() => setSelectedCategory('1')}>봉사후기</button>
          <button onClick={() => setSelectedCategory('2')}>입양후기</button>
        </div>

        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>
              <Link to={`/board/${item._id}`}>
                <label>제목 : {item.title}</label>
                <p></p>
                <label>작성자 : {item.userName}</label>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Board;