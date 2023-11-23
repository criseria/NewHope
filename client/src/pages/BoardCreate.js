import React, { useEffect, useState } from 'react';
import axios from 'axios';
import item from '../components/item';

import './BoardUpdate';
import { fetcher } from '../utils/fetcher';
import { json, useNavigate, useParams } from 'react-router-dom';
// import { Session } from 'express-session';


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
  const [userName, setUserName] = useState('');

  let sessionStorage = window.sessionStorage;

  const navigate = useNavigate();


  // const onNameHandler = (event) => {
  //   setUserName(event.currentTarget.value);
  // }

  const body = {
    categoryId: categoryId,
    title: title,
    content: content,
    userName: sessionStorage.key('userName'),
    boardDate : Date()
  }
  // console.log(Session);
    
  // const [BoardData, setBoardData] = useState({
  //   categoryId: '',
  //   title: '', 
  //   userName: '',
  //   content: '',
  //   boardDate: Date()
  // });

  // console.log(BoardData);
  console.log(body);

  const HandleSubmit = async (req, res) => {
      // e.preventDefault();

      if(emptyError){
        alert('모든 문항을 다 작성해주세요.');
      }
      else if(!body.title){
        alert('제목을 작성해주세요.');
      }
      else if(!body.content){
        alert('내용을 작성해주세요.');
        
      }else{
        try{
          const res = await fetcher('post', '/board/boardcreate', body);
          console.log(res);
          alert('글 작성이 완료되었습니다.');
          navigate('/board');

        } catch(error){
          console.error('글 작성 실패 : ', error);
          alert('서버 오류로 글 작성에 실패했습니다.')
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