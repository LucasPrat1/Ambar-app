import './App.css';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Products from './Components/Products/Products';
import Product from './Components/Product/Product';
import Cart from './Components/Cart/Cart';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/products/:id' element={<Product />} />
        <Route exact path='/cart' element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
