import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './BoardUpdate.css';

function GetData(vocId) {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    axios.get('http:/localhost:3000/voc/search/'+vocId)
    .then((response)=> {
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
    })
  }, []);

  const item =  (<>
    <h2 align="center">글 상세정보</h2>
    <div className="voc-view-wrapper">
        <div className="voc-view-row">
            <label>글 번호</label>
            <label>{ question.id }</label>
        </div>
        <div className="voc-view-row">
            <label>제목</label>
            <label>{ question.title }</label>
        </div>
        <div className="voc-view-row">
            <label>작성일</label>
            <label>{ question.createDate }</label>
        </div>
        <div className="voc-view-row">
            <label>내용</label>
            <div>
                {
                question.content
                }
            </div>
        </div>
    </div></>)

    return item;
}

function BoardUpdate() {
  const{vocId} = useParams();
  const item = GetData(vocId);

  return (<>
    <div>
        {item}
    </div>
  </>);
}
  
export default BoardUpdate;