import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register'
import NavBar from './components/NavBar';
import MyPage from './pages/Mypage';
import { AuthProvider } from './contexts/AuthContext';
import EditProfile from './pages/EditProfile';
import DeleteAccount from './pages/DeleteAccount';
import PasswordVerification from './pages/PasswordVerification';
import Animal from './pages/Animal';
import AnimalInfo from './pages/AnimalInfo';
import MainPage from './pages/MainPage';
import Procedure from './pages/Procedure';
import Intro from './pages/Intro';
import Board from './pages/Board';
import BoardCreate from './pages/BoardCreate';
import BoardUpdate from './pages/BoardUpdate';
import BoardList from './pages/BoardList';
// import BoardAuthLayout from './components/BoardAuthLayout';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/Mypage' element={<MyPage />} />
            <Route path='/Mypage/edit' element={<EditProfile />} />
            <Route path='/Mypage/DeleteAccount' element={<DeleteAccount />} />
            <Route path='/passwordVerification' element={<PasswordVerification />} />
            <Route path='/animal' element={<Animal />}></Route>
            <Route path='/animal/view' element={<AnimalInfo />} />
            <Route path='/MainPage' element={<MainPage />} />
            <Route path='/Intro' element={<Intro />} />
            <Route path='/procedure' element={<Procedure />} />
            <Route path='/board' element={<Board />} />
            {/* <Route element={<BoardAuthLayout />}> */}
              <Route path='/board/boardcreate' element={<BoardCreate />}  />
            {/* </Route> */}
            <Route path="/board/boardupdate/:vocId" component={BoardUpdate} />
            <Route path="/board/boardlist" component={BoardList} />
          </Routes>
        </AuthProvider>
      </Router>
    </div >
  );
}

export default App;
