import './App.css';
import React, { useEffect } from 'react';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Products from './Components/Products/Products';
import Product from './Components/Product/Product';
import Cart from './Components/Cart/Cart';
import Auth from './Components/Auth/Auth';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth'
// import firebaseApp from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from './redux/auth/thunks'

// import firebase from 'firebase/compat/app';

function App() {
  const user = useSelector((state) => state.auth.user)
  const auth = getAuth();
  const dispatch = useDispatch();

  // console.log('auth.currentUser', auth.currentUser);
  // auth.currentUser && dispatch(setAuth(auth.currentUser));

  useEffect(() => {
    onAuthStateChanged( auth, (us) => {
      console.log('us', us);
      dispatch(setAuth(us));
    });
  }, [auth, dispatch])

  console.log('user en app', user);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/products/:id' element={<Product />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/login' element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
