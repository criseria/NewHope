import { createContext, useContext, useState } from 'react';

const BoardDataContext = createContext();

export const useBoardData = () => {
  return useContext(BoardDataContext);
};

export const BoardDataProvider = ({ children }) => {
  const [boardData, setBoardData] = useState([]);

  return (
    <BoardDataContext.Provider value={{ boardData, setBoardData }}>
      {children}
    </BoardDataContext.Provider>
  );
};