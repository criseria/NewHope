import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CommonTable from '../components/CommonTable';
import CommonTableColumn from '../components/CommonTableColumn';
import CommonTableRow from '../components/CommonTableRow';

import { Link, Route } from 'react-router-dom';
import BoardHeader from '../components/BoardHeader'; 




function GetData() {
  const [data, setData] = useState({});
  // useEffect(() => {
  //   axios.get('/board').then((response)=> {
  //     setData(response.data);
  //   })
  // }, []);

  const item = (Object.values(data)).map((board) => (
    <CommonTableRow key={board.id}>
      <CommonTableColumn>{board.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/board/${board.id}`}>
          {board.title}
        </Link>
      </CommonTableColumn>
      <CommonTableColumn>{board.createdAt}</CommonTableColumn>
      <CommonTableColumn>{board.username}</CommonTableColumn>
    </CommonTableRow>
  ));

  return item;
}

function Board() {
  const item = GetData();

  return (<>
    <BoardHeader></BoardHeader>
    <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
      {item}
    </CommonTable>
  </>);
}
  
export default Board;