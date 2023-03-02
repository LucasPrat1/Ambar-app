import React from 'react'
// import Button from '../Shared/Buttons/Buttons';
import { NavLink, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { signOut } from 'firebase/auth'
import firebaseApp from '../../firebase';


const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart)
  const user = useSelector((state) => state.auth.user)

  const handleExit = () => {
    firebaseApp.auth().signOut().then(() => {
      // setUser()
      redirect("/");
      alert('Log Out Successfully');
    }).catch((error) => {
      console.error(error)
    });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">AMBAR</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>
          {
            user ? (
              <div className="buttons">
                <span>Welcome {user.name}</span>
                <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-shopping-cart me-1"></i>Cart ({cart.length})
                </NavLink>
                <button onClick={() => handleExit()} className="btn btn-outline-dark ms-2">
                  <i className="fa fa-sign-in me-1"></i>Exit
                </button>
              </div>
            ) : (
              <div className="buttons">
                <NavLink to="/login" className="btn btn-outline-dark ms-2">
                  <i className="fa fa-sign-in me-1"></i>Login
                </NavLink>
                {/* <NavLink to="/register" className="btn btn-outline-dark ms-2">
                <i className="fa fa-user-plus me-1"></i>Register
                </NavLink> */}
              </div>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;