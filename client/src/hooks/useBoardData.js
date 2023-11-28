import { useEffect, useState } from 'react';
import { fetcher } from '../utils/fetcher';
import { useNavigate } from 'react-router-dom';

const useBoardData = () => {
    const [categoryId, setCategoryId] = useState('');
    const [title, setTitle] = useState('');
    const [userName, setUserName] = useState('');
    const [content, setContent] = useState('');
    const [boardDate, setBoardDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const boardDataList = async () => {
        try{
            const boardData = await fetcher('get', '/board/boardcreate', { withCredentials: true });
                setCategoryId(boardData.categoryId);
                setTitle(boardData.title);
                setUserName(boardData.userName);
                // setCategoryId(boardData.content);
                setBoardDate(boardData.setBoardDate);
            } catch(error){
                console.log('데이터를 가져오는데 실패', error);
            }
        };
        boardDataList();
    }, []);


// const updateBoardData = async () => {
//     try{
//         await setCategoryId(categoryId);
//         await setTitle(title);
//         await setUserName(userName);
//         await setBoardDate(boardDate);

//         const updatedBoardData = await fetcher('put', '/board/boardlist', {
//             categoryId,
//             title,
//             userName,
//             boardDate
//         }, { withCredentials: true });
        
//         alert('글 수정 완료했습니다.');
//         navigate('/board');
//         console.log(updateBoardData);
//     } catch(error){
//         console.log('게시판 데이터를 업데이트하는데 실패', error);
//     }
// };

// return{
//     categoryId,
//     title,
//     userName,
//     content,
//     boardDate,
//     setCategoryId,
//     setTitle,
//     setUserName,
//     setContent,
//     setBoardDate
//     };
// };

export default useBoardData;

 
