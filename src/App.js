import './App.css';
import React, { useEffect } from 'react';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Products from './Components/Products/Products';
import Product from './Components/Product/Product';
import Cart from './Components/Cart/Cart';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SingUp'
import OrderPDF from './Components/OrderPDF/OrderPDF'
import { Route, Routes } from 'react-router-dom';
import { onIdTokenChanged, getAuth } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './redux/auth/thunks'
import { cleanUser } from './redux/auth/actions';
import Profile from './Components/Profile/Profile';

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onIdTokenChanged(auth, async (user) => {
      dispatch(cleanUser());
      if (user) {
        const token = await user.getIdToken();
        dispatch(setAuth(token));
      }
    });
  }, [auth, dispatch])


  // const token = useSelector((state) => state.auth.token)
  // const user = useSelector((state) => state.auth.user)
  // console.log('reduxAuth', reduxAuth)
  // console.log('user en app', user);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/product/:id' element={<Product />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/signin' element={<SignIn />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/profile/:uid' element={<Profile />} />
        <Route exact path='/order/:id' element={<OrderPDF />} />
      </Routes>
    </>
  );
}

export default App;
