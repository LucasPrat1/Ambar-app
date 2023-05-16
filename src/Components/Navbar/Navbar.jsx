import React, { useState } from 'react'
import styles from './navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/thunks';
import { Button, Modal } from '../../Components/Shared/index';



const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);
  const auth = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExit = async () => {
    const resp = await dispatch(logOut());
    if (!resp.error) {
      setChildrenModal(resp.message);
      setShowModal(true)
    };
  };

  return (
    <>
      <Modal show={showModal} handleClose={() => { setShowModal(false); navigate('/') }} >
        {childrenModal}
      </Modal>
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
                    <i className="fa-solid fa-user"></i>  {auth.user.name}
                  </Button>
                </Link>
                {
                  auth.user.isAdmin &&
                  <Link to="/abmorders">
                    <Button className={styles.navButton}>
                      <i className="fa-solid fa-clipboard-list"></i>  Orders
                    </Button>
                  </Link>
                }
                <Link to="/cart">
                  <Button className={styles.navButton}>
                    <i className="fa-solid fa-shopping-cart"></i>  Cart ({cart.length})
                  </Button>
                </Link>
                <Button onClick={() => handleExit()} className={styles.navButton}>
                  <i className="fa fa-sign-in me-1"></i>  Exit
                </Button>
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
          }
        </div>
      </header>
    </>
  )
}

export default Navbar;