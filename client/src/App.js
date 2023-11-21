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
          </Routes>
        </AuthProvider>
      </Router>
    </div >
  );
}

export default App;
