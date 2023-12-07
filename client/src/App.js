import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register'
import NavBar from './components/NavBar';
// import Footer from './components/footer';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';

import Cart from './pages/Cart'
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import OrderSuccessfully from './pages/OrderSuccessfully'

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
import FindId from './pages/FindId';
import FindPw from './pages/FindPw';
import Chatbot from './components/ChatBot';
import BoardContent from './pages/BoardContent';
import BoardUpdate from './pages/BoardUpdate';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            {/* Intro Start*/}
            <Route path='/' element={<MainPage />} />
            <Route path='/MainPage' element={<MainPage />} />
            <Route path='/procedure' element={<Procedure />} />
            <Route path='/Intro' element={<Intro />} />
            {/* Intro End*/}

            {/* Product Start */}
            <Route path='/product' element={<Product />} />
            <Route path='/productcreate' element={<ProductCreate />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Order />} />
            <Route path='/ordersuccessfully' element={<OrderSuccessfully />} />
            {/* Product End */}

            {/* Auth Start */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/Mypage" element={<MyPage />} />
            <Route path='/Mypage/edit' element={<EditProfile />} />
            <Route path='/Mypage/DeleteAccount' element={<DeleteAccount />} />
            <Route path='/passwordVerification' element={<PasswordVerification />} />
            <Route path='/FindId' element={<FindId />} />
            <Route path='/FindPw' element={<FindPw />} />
            {/* Auth End */}

            {/* Animal Start */}
            <Route path='/animal' element={<Animal />}></Route>
            <Route path='/animal/view' element={<AnimalInfo />} />
            {/* Animal End */}

            {/* Board Start */}
            <Route path='/board' element={<Board />} />
            <Route path='/board/boardcreate' element={<BoardCreate />} />
            <Route path="/board/:id" element={<BoardContent />} />
            <Route path="/board/update/:id" element={<BoardUpdate />} />
            {/* <Route element={<BoardAuthLayout />}> */}
            {/* </Route> */}
            {/* Board End */}
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
          <Chatbot />
          {/* <Footer /> */}
        </AuthProvider>
      </Router>
    </div >
  );
}

export default App;
