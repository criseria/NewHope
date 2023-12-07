import React, { useEffect, useState } from 'react';
import BoardHeader from '../components/BoardHeader';
import { Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import './Board.css';
import Footer from "../components/Footer";

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function Board() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeButton, setActiveButton] = useState('all');

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
          file: item.file,
          boardDate: item.boardDate,
        }));

        setData(processedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveButton(category);
  };

  const filteredData = selectedCategory === 'all' ? data : data.filter(item => item.categoryId === selectedCategory);

  return (
    <>
      <br />
      <div>

        <div className="board-container">
          <h2>게시판 목록</h2>
          <br />
          <div className='category-btn'>
            <button
              onClick={() => handleCategoryClick('all')}
              className={activeButton === 'all' ? 'active' : ''}
            >
              전체보기
            </button>
            <button
              onClick={() => handleCategoryClick('1')}
              className={activeButton === '1' ? 'active' : ''}
            >
              봉사후기
            </button>
            <button
              onClick={() => handleCategoryClick('2')}
              className={activeButton === '2' ? 'active' : ''}
            >
              입양후기
            </button>
          </div>

          <Link to='/board/boardcreate' className="write-btn">
            <button align="right">
              글 작성
            </button>
          </Link>
          <br />
          <br />
          <br />
          <br />
          <div className='review-container'>
            <ul>
              {filteredData.map((item, index) => (
                <div key={index} className='review-item'>
                  <Link to={`/board/${item._id}`} className='review-link'>
                    <img src={`http://localhost:8080/${item.file}`} alt="Uploaded" style={{ maxWidth: '200px' }} />
                    <p></p>
                    <div style={{ color: 'black' }}>
                      <label>{item.title}</label>
                      <br />
                      <label>{item.userName}</label>
                      <p></p>
                      <label>{formatDate(item.boardDate)}</label>
                    </div>
                  </Link>
                </div>
              ))}
            </ul>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Board;
