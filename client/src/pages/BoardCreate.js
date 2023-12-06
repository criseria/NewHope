import React, { useEffect, useState } from 'react';
import item from '../components/item';
import './BoardUpdate';
import { fetcher } from '../utils/fetcher';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function GetCategory() {
  let [category, setCategory] = useState(item);

  const categories = (Object.values(category)).map((item) => (
    <option key={item.id} value={item.id}>
      {item.displayname}
    </option>
  ));

  return categories;
}

function BoardCreate() {
  const categories = GetCategory();
  const [file, setFile] = useState(null);
  const [emptyError, setEmptyError] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await fetcher('get', '/auth/getUserInfo');
        setUserId(userId.userName);
        setUserInfo(userId);
        
      } catch (error) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (emptyError) {
      alert('모든 문항을 다 작성해주세요.');
    } else if (!title) {
      alert('제목을 작성해주세요.');
    } else if (!content) {
      alert('내용을 작성해주세요.');
    } else {
      try {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('categoryId', categoryId);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('userName', userId);
        formData.append('boardDate', new Date());

        const res = await fetcher('post', '/board/board/boardcreate', formData);
        console.log(res);
        alert('글 작성이 완료되었습니다.');
        navigate('/board');
      } catch (error) {
        console.error('글 작성 실패 : ', error);
        alert('서버 오류로 글 작성에 실패했습니다.');
      }
    }
  };

  return (
    <>
      <br />
      <h2 align="center">글 작성</h2>
      <div className="voc-view-wrapper">
        <div className="voc-view-row">
          <label>후기 유형</label>
          <select onChange={(event) => setCategoryId(parseInt(event.target.value))}>
            {categories}
          </select>
        </div>
        <div className="voc-view-row">
          <label>제목</label>
          <input onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="voc-view-row">
          <label>내용</label>
          <textarea onChange={(event) => setContent(event.target.value)} />
        </div>
        <div className="voc-view-row">
          <label>첨부 파일</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button className="voc-view-go-list-btn" onClick={handleSubmit}>등록</button>
        <Link to={'/board'}>취소</Link>
      </div>
    </>
  );
}

export default BoardCreate;