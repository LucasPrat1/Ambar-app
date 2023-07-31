import React, { useState } from 'react'
import styles from './navbar.module.css'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/thunks';
import { Button, Alert } from '../../Components/Shared/index';



const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);
  const auth = useSelector((state) => state.auth);

  const [showAlert, setShowAlert] = useState(false)
  const [childrenAlert, setChildrenAlert] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const nameCap = auth?.user?.name?.charAt(0).toUpperCase() + auth?.user?.name?.slice(1);

  const handleExit = async () => {
    const resp = await dispatch(logOut());
    if (!resp.error) {
      setChildrenAlert(resp.message)
      setShowAlert(true);
      navigate('/')
    };
  };

  return (
    <>
      <Alert show={showAlert} setShow={setShowAlert}>{childrenAlert}</Alert>
      <header className={styles.container}>
        <NavLink to="/"><h1> AMBAR </h1></NavLink>
        <div className={styles.navbarCollapse}>
          <ul>
            <li className={styles.navItem}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/about">About</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.navbarLogin}>
          {
            auth.token ? (
              <div className={styles.navbarButtons}>
                <Link to={`/profile/${auth.user.firebaseUid}`}>
                  <Button className={styles.navButton}>
                    <i className="fa-solid fa-user"></i> {nameCap}
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button className={styles.navButton}>
                    <i className="fa-solid fa-shopping-cart"></i>  Cart ({cart.length})
                  </Button>
                </Link>

                {auth.user.isAdmin &&
                  <>
                    <div className={styles.dropdown}>
                      <Button className={styles.dropButton}>
                        <i className="fa-solid fa-clipboard-list"></i>  Menu
                      </Button>
                      <div className={styles.dropdownContent}>
                        <Link to="/abmorders">
                          <i className="fa-solid fa-clipboard-list"></i>  ABM Orders
                        </Link>
                        <Link to="/abmproducts">
                          <i className="fa-solid fa-clipboard-list"></i> ABM Products
                        </Link>
                      </div>
                    </div>
                  </>
                }

                <Button onClick={() => handleExit()} className={styles.navButton}>
                  <i className="fa fa-sign-in me-1"></i>  Exit
                </Button>
              </div>
            ) : (
              location.pathname === '/signin' ? (
                <div className={styles.navbarButtons}>
                  <Link to="/signup">
                    <Button className={styles.navButton}>
                      <i className="fa-solid fa-user"></i> Sign Up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className={styles.navbarButtons}>
                  <Link to="/signin">
                    <Button className={styles.navButton}>
                      <i className="fa-solid fa-user"></i> Sign In
                    </Button>
                  </Link>
                </div>
              )
            )
          }
        </div>
        <button className={styles.burgerButton}>
          <i className="fa-solid fa-bars fa-2xl"></i>
        </button>
      </header>
    </>
  )
}

export default Navbar;