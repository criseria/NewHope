import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register'
import NavBar from './components/NavBar';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';

import Cart from './pages/Cart'
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import OrderSuccessfully from './pages/OrderSuccessfully'
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<div>daw</div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product' element={<Product />} />
          <Route path='/productcreate' element={<ProductCreate />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/ordersuccessfully' element={<OrderSuccessfully />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
