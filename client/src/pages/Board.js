import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CommonTable from '../components/CommonTable';
import CommonTableColumn from '../components/CommonTableColumn';
import CommonTableRow from '../components/CommonTableRow';

import { Link, Route } from 'react-router-dom';
import BoardHeader from '../components/BoardHeader'; 
import { fetcher } from '../utils/fetcher';


function GetData() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('get', '/board', { withCredentials: true })
        setData(response.data);
      } catch(error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return Array.isArray(data) ? data : [];
}

function Board() {
  const items = GetData();

  console.log(items);

  return (
  <>
    <BoardHeader></BoardHeader>
    <CommonTable headersName={['글번호', '분류', '제목', '등록일', '작성자']}>
      {items.map((board) => (
            <CommonTableRow key={board.id}>
              {/* <CommonTableColumn>{board.id}</CommonTableColumn> */}
              <CommonTableColumn>{board.categoryId}</CommonTableColumn>
              <CommonTableColumn>
                <Link to={`/board/${board.id}`}>
                  {board.title}
                </Link>
              </CommonTableColumn>
              <CommonTableColumn>{board.content}</CommonTableColumn>
              <CommonTableColumn>{board.username}</CommonTableColumn>
            </CommonTableRow>
          ))} 
    </CommonTable>
  </>
  );
}
  
export default Board;