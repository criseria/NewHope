import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import './BoardUpdate.css'; // 추가된 부분
import Footer from '../components/Footer';

const BoardUpdate = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await fetcher('get', `/board/board/${id}`, { withCredentials: true });
        setPostData({
          title: res.title,
          content: res.content,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleUpdatePost = async () => {
    try {
      await fetcher('put', `/board/board/update/${id}`, postData, { withCredentials: true });
      console.log('게시물이 성공적으로 업데이트되었습니다.');
      window.location.href = `/board/${id}`;
    } catch (error) {
      console.error('게시물 업데이트 중 오류 발생:', error);
    }
  };

  return (
    
    <div className="update-container"> 
    <br/>
      <h2>게시물 수정</h2>
      <br/>
      <br/>
      <form>
        <label>제목:</label>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleInputChange}
        />
        <br/>
        <br/>
        <label>내용:</label>
        <textarea className='label-content'
          name="content"
          value={postData.content}
          onChange={handleInputChange}
        />

        <br/>
        <br/>
        <div className='btn-update'>
          <button type="button" onClick={handleUpdatePost} className="update-btn"> {/* 수정된 부분 */}
            게시물 업데이트
          </button>

          <Link to={`/board/${id}`} className="back-btn" style={{color:'gray'}}>돌아가기</Link> 
        </div>
      </form>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>
  );
};

export default BoardUpdate;
