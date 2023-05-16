import React, { useEffect, useState } from 'react'
import styles from './Product.module.css'
import { Loader, Button, Rating, Alert } from '../../Components/Shared/index';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsId } from "../../redux/products/thunks"
import { addItem, deleteItem } from "../../redux/cart/thunks";


const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.products.isLoading);
  const product = useSelector((state) => state.products.product);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.cart);


  const [showAlert, setShowAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('')
  const [childrenAlert, setChildrenAlert] = useState('')

  const item = cart.find((item) => item._id === product._id);

  useEffect(() => {
    dispatch(getProductsId(id));
  }, [dispatch, id])

  const handleAdd = async () => {
    if (!auth.token) {
      navigate('/signin')
    } else {
      const resp = await dispatch(addItem(product))
      if (!resp.error) {
        setChildrenAlert(resp.message)
        setTypeAlert('success')
        setShowAlert(true);
      } else {
        setChildrenAlert(resp.message)
        setTypeAlert('error')
        setShowAlert(true);
      }
    }
  }

  const handleDelete = async () => {
    if (!auth.token) {
      navigate('/signin')
    } else {
      const resp = await dispatch(deleteItem(product._id))
      if (!resp.error) {
        setChildrenAlert(resp.message)
        setTypeAlert('warning')
        setShowAlert(true);
      } else {
        setChildrenAlert(resp.message)
        setTypeAlert('error')
        setShowAlert(true);
      }
    }
  }

  return (
    <>
      <Loader show={isLoading} />
      <Alert show={showAlert} setShow={setShowAlert} type={typeAlert}>{childrenAlert}</Alert>
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.containerInfo}>
          <Link onClick={() => navigate(-1)} className={styles.back} ><i className="fa-solid fa-backward"></i> Back</Link>
          <h4>{product.category}</h4>
          <h1>{product.name}</h1>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <p className={styles.price}>$ {product.price}</p>
          <p className={styles.brand} >Brand: {product.brand}</p>
          <p className={styles.description} >{product.description}</p>
          {
            product.countInStock > 0 ? (
              <>
                <div className={styles.inStock}>
                  In Stock
                </div>
                {item ? (
                  <><div className={styles.containerButtons}>
                    <input className={styles.input} type="text" value={item.qty} readOnly/>
                    <Button width={'6rem'} onClick={() => handleAdd()}><i className="fa-solid fa-cart-plus" /> Add</Button>
                    <Button width={'6rem'} onClick={() => handleDelete()}><i className="fa-solid fa-delete-left" /> Delete</Button>
                  </div><Link className={styles.buttonAdd} to={auth.token ? ('/cart') : ('/signin')}>
                      <Button width={'10rem'}  backgroundColor={'#303030'} color={'#fff'}>Go to Cart</Button>
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