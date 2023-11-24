import React, { useEffect, useState } from 'react';
import item from '../components/item';
import './BoardUpdate';
import { fetcher } from '../utils/fetcher';
import { useNavigate } from 'react-router-dom';



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
  const [emptyError, setEmptyError] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userId , setUserId] = useState('');
  const navigate = useNavigate();
  
  // const { setBoardData } = useBoardData();


  const body = {
    categoryId: categoryId,
    title: title,
    content: content,
    userName: userId,
    boardDate: new Date()
  }

  // const [boardData, setBoardData] = useState({
  //   categoryId : '',
  //   title : '',
  //   content : '',
  //   userId : '',
  //   boardDate : ''
  // })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await fetcher('get', '/auth/getUserInfo');
      
        setUserId(userId.userName);

        if (userInfo) {
          setUserInfo(userInfo);
        } else {
          console.error('사용자 정보를 가져오는 중 에러 발생');
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      }
    };
    fetchUserInfo();

  }, []);
  
  console.log(body);


  const HandleSubmit =  () => {
    
    if (emptyError) {
      alert('모든 문항을 다 작성해주세요.');
    }
    else if (!body.title) {
      alert('제목을 작성해주세요.');
    }
    else if (!body.content) {
      alert('내용을 작성해주세요.');

    } else {
      try {
        const res =  fetcher('post', '/board/board/boardcreate', body);
        console.log(res);

        // setBoardData((prevData) => [...prevData, res.data]);
        
        alert('글 작성이 완료되었습니다.');
        navigate('/board');
        
      } catch (error) {
        console.error('글 작성 실패 : ', error);
        alert('서버 오류로 글 작성에 실패했습니다.');
      }
    }
  };
  
  
  return (<>
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
        <input onChange={(event) => setTitle(event.target.value)}></input>
      </div>
      {/* <div className="voc-view-row">
        <label>작성자</label>
        <form value={userName} onChange={(event) => setUserName(event.target.value)} readOnly></form>
      </div> */}
      <div className="voc-view-row">
        <label>내용</label>
        <textarea onChange={(event) => setContent(event.target.value)}></textarea>
      </div>

      {/* <div className="voc-view-row">
        <label>사진 첨부</label>
        <input onChange={(event) => setEmail(event.target.value)}></input>
      </div> */}
      <button className="voc-view-go-list-btn" onClick={() => HandleSubmit({ body })}>등록</button>

    </div>
  </>);
}

export default BoardCreate;