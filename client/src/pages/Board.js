import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CommonTable from '../components/CommonTable';
import CommonTableColumn from '../components/CommonTableColumn';
import CommonTableRow from '../components/CommonTableRow';

import { Link, Route } from 'react-router-dom';
import BoardHeader from '../components/BoardHeader'; 

// import { useBoardData } from '../path-to-context';


function GetData() {
  const [data, setData] = useState({});
  // useEffect(() => {
  //   axios.get('/board').then((response)=> {
  //     setData(response.data);
  //   })
  // }, []);

  const item1 = (Object.values(data)).map((board) => (
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

  return item1;
}

function Board() {
  const item = GetData();

  // const { boardData } = useBoardData();

  // const item = boardData.map((board) => (
  //   <CommonTableRow key={board.id}>
  //     <CommonTableColumn>{board.id}</CommonTableColumn>
  //     <CommonTableColumn>
  //       <Link to={`/board/${board.id}`}>
  //         {board.title}
  //       </Link>
  //     </CommonTableColumn>
  //     <CommonTableColumn>{board.createdAt}</CommonTableColumn>
  //     <CommonTableColumn>{board.username}</CommonTableColumn>
  //   </CommonTableRow>
  // ));

  return (<>
    <BoardHeader></BoardHeader>
    <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
      {item}
    </CommonTable>
  </>);
}
  
export default Board;