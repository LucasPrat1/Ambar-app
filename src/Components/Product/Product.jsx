import React, { useEffect, useState } from 'react'
import styles from './Product.module.css'
import { Loader, Button, Rating, Alert } from '../../Components/Shared/index';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsId } from "../../redux/products/thunks"
import { addItem } from "../../redux/cart/thunks";


const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.products.isLoading);
  const product = useSelector((state) => state.products.product);
  const auth = useSelector((state) => state.auth);

  const [showAlert, setShowAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('')
  const [childrenAlert, setChildrenAlert] = useState('')


  useEffect(() => {
    dispatch(getProductsId(id));
  }, [dispatch, id])

  const onClick = async (event) => {
    if (!auth.token) {
      navigate('/signin')
    } else {
      const resp = await dispatch(addItem(product))
      if (!resp.error) {
        setChildrenAlert(resp.message)
        setTypeAlert('info')
        setShowAlert(true);
      } else {
        setChildrenAlert(resp.message)
        setTypeAlert('error')
        setShowAlert(true);
      }
    }
  }

  console.log('product', product)
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
                <div className={styles.containerButtons}>
                  <Button onClick={() => onClick()}><i className="fa fa-cart-plus me-2" />Add to Cart</Button>
                  <Link className={styles.buttonAdd} to={auth.token ? ('/cart') : ('/signin')}>
                    <Button backgroundColor={'#303030'} color={'#fff'}>Go to Cart</Button>
                  </Link>
                </div>
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