import React, { useEffect } from 'react'
import styles from './Product.module.css'
import { Loader, Button } from '../../Components/Shared/index';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsId } from "../../redux/products/thunks"
import { addItem } from "../../redux/cart/thunks";


const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsId(id));
  }, [dispatch, id])

  const isLoading = useSelector((state) => state.products.isLoading);
  const product = useSelector((state) => state.products.product);

  console.log('product', product)
  return (
    <>
      {isLoading ? (
        <Loader show={isLoading} />
      ) : (
        <div className={styles.container}>
          <img src={product.image} alt={product.title} />
          <div className={styles.containerInfo}>
            <Link onClick={() => window.history.back()} className={styles.back} >go back</Link>
            <h4>{product.category}</h4>
            <h1>{product.title}</h1>
            <p className={styles.rating}>
              Rating {product.rating && product.rating.rate} <i className="fa fa-star" />
            </p>
            <p className={styles.price}>$ {product.price}</p>
            <p className={styles.description} >{product.description}</p>
            <div className={styles.containerButtons}>
              <Button onClick={() => dispatch(addItem(product))}><i className="fa fa-cart-plus me-2" />Add to Cart</Button>
              <Link className={styles.buttonAdd} to='/cart'>
                <Button backgroundColor={'#303030'} color={'#fff'} >Go to Cart</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default Product;