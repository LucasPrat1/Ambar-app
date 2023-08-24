import React, { useEffect } from 'react'
import styles from './Product.module.css'
import { Loader, Button } from '../../Components/Shared/index';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsId } from "../../redux/products/thunks"
import { addItem, deleteItem } from "../../redux/cart/thunks";
import { setMessageAlert, setShowAlert, setTypeAlert } from '../../redux/alert/actions';
import { Rating } from '@mui/material'

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsId(id));
  }, [dispatch, id])

  const isLoading = useSelector((state) => state.products.isLoading);
  const product = useSelector((state) => state.products.product);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.cart);

  const item = cart.find((item) => item._id === product._id);

  const handleAdd = async () => {
    if (!auth.token) {
      navigate('/signin')
    } else {
      const resp = dispatch(addItem(product))
      if (!resp.error) {
        dispatch(setMessageAlert(resp.message));
        dispatch(setTypeAlert('success'));
        dispatch(setShowAlert(true));
      } else {
        dispatch(setMessageAlert(resp.message));
        dispatch(setTypeAlert('error'));
        dispatch(setShowAlert(true));
      }
    }
  }

  const handleDelete = async () => {
    if (!auth.token) {
      navigate('/signin')
    } else {
      const resp = dispatch(deleteItem(product._id))
      if (!resp.error) {
        dispatch(setMessageAlert(resp.message));
        dispatch(setTypeAlert('warning'));
        dispatch(setShowAlert(true));
      } else {
        dispatch(setMessageAlert(resp.message));
        dispatch(setTypeAlert('error'));
        dispatch(setShowAlert(true));
      }
    }
  }

  return (
    isLoading ?
      <Loader show={isLoading} />
      : <>
        <div className={styles.container}>
          <div className={styles.containerImg}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={styles.containerInfo}>
            <Link onClick={() => navigate(-1)} className={styles.back} ><i className="fa-solid fa-backward"></i> Back</Link>
            <h4>{product.category}</h4>
            <h1>{product.name}</h1>
            <p className={styles.price}>$ {product.price}</p>
            <div>
              <p className={styles.brand}>Rating</p>
              <Rating
                defaultValue={product?.rating}
                value={product?.rating}
                readOnly
                size='large'
              />
            </div>
            <p className={styles.brand} >Brand: {product.brand}</p>
            <div>
              <p className={styles.brand}>Description: </p>
              <p className={styles.description} >{product.description}</p>
            </div>
            {
              product.stock > 0 ? (
                <>
                  <div className={styles.inStock}>
                    In Stock
                  </div>
                  {item ? (
                    <><div className={styles.containerButtons}>
                      <input className={styles.input} type="text" value={item.qty} readOnly />
                      <Button width={'6rem'} onClick={() => handleAdd()}><i className="fa-solid fa-cart-plus" /> Add</Button>
                      <Button width={'6rem'} onClick={() => handleDelete()}><i className="fa-solid fa-delete-left" /> Delete</Button>
                    </div><Link className={styles.buttonAdd} to={auth.token ? ('/cart') : ('/signin')}>
                        <Button width={'10rem'} backgroundColor={'#303030'} color={'#fff'}>Go to Cart</Button>
                      </Link></>
                  ) : (
                    <div className={styles.containerButtons}>
                      <Button onClick={() => handleAdd()}><i className="fa fa-cart-plus me-2" /> Add to Cart</Button>
                      <Link className={styles.buttonAdd} to={auth.token ? ('/cart') : ('/signin')}>
                        <Button backgroundColor={'#303030'} color={'#fff'}>Go to Cart</Button>
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className={styles.unavailable}>
                  Unavailable
                </div>
              )
            }
          </div>
        </div>
      </>
  )
};

export default Product;