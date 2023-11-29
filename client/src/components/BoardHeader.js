import React from 'react';
import { Link } from 'react-router-dom';
import './BoardHeader.css';

const BoardHeader = props => {
  const { headersName, children } = props;

  return (
    <div className="board-header">
      <br/>
        <h2 align="left">후기</h2>
        {/* <div className='sorter-box box'>
          <a href='#'>
            <span className='division active'>봉사</span>
          </a>
          <a href='#'>
            <span className='division'> 입양</span>
          </a>
        </div> */}
        <br/>
        <Link to='/board/boardcreate'>
            <button align="right" className="voc-view-go-list-btn" >
              글 작성
            </button>
        </Link>
    </div>
  )
}

export default BoardHeader;