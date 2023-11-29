import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';

import './BoardUpdate.css';

function BoardUpdate() {
  const { vocId } = useParams();
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState(''); // 업데이트할 데이터를 위한 state
  const [updatedContent, setUpdatedContent] = useState(''); // 업데이트할 데이터를 위한 state

  useEffect(() => {
    // 글 데이터를 가져오는 부분
    fetcher('get', `/board/boardupdate/${vocId}`)
      .then((response) => {
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      });
  }, [vocId]);

  const handleUpdate = async () => {
    try {
      // 실제 업데이트를 수행하는 부분
      const response = await axios.post('/board/boardupdate', {
        categoryId: question.categoryId,
        title: updatedTitle || question.title, // 새로운 제목 또는 기존 제목
        content: updatedContent || question.content, // 새로운 내용 또는 기존 내용
      });

      console.log(response.data); // 서버로부터의 응답을 콘솔에 출력

      // 업데이트가 성공하면 어떤 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error('글 업데이트 실패:', error);
    }
  };

  return (
    <>
      <h2 align="center">글 상세정보</h2>
      <div className="voc-view-wrapper">
        <div className="voc-view-row">
          <label>글 번호</label>
          <label>{question.id}</label>
        </div>
        <div className="voc-view-row">
          <label>제목</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        </div>
        <div className="voc-view-row">
          <label>작성일</label>
          <label>{question.createDate}</label>
        </div>
        <div className="voc-view-row">
          <label>내용</label>
          <div>{question.content}</div>
        </div>

        {/* 글 업데이트 버튼 */}
        <button onClick={handleUpdate}>글 업데이트</button>
      </div>
    </>
  );
}

export default BoardUpdate;
