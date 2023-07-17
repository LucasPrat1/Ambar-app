import React, { useState, useEffect } from 'react'
import Card from '../Card/Card';
import styles from './products.module.css'
import { Loader, Button } from '../../Components/Shared/index';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/products/thunks';

const Products = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const isLoading = useSelector((state) => state.products.isLoading);
  const data = useSelector((state) => state.products.list);

  useEffect(() => {
    setFilter(data);
    setMounted(true);
  }, [data])

  const filterProducts = (category) => {
    const filterList = data.filter((prod) => prod.category === category);
    setFilter(filterList);
  }

  return (
    <>
      <Loader show={isLoading} />
      <section className={styles.products}>
        <div>
          <h2>Featured Products</h2>
          <div className={styles.containerButtons}>
            <Button onClick={() => setFilter(data)}>All</Button>
            <Button onClick={() => filterProducts("Pants")}>Pants</Button>
            <Button onClick={() => filterProducts("Shirts")}>Shirts</Button>
            <Button onClick={() => filterProducts("jewelery")}>Jewelery</Button>
            <Button onClick={() => filterProducts("electronics")}>Electronics</Button>
          </div>
        </div>
        {mounted && (
          <div className={styles.containerCards}>
            {filter.map((product) => {
              return <Card key={product._id} product={product} />
            })}
          </div>
        )}
        <div className={styles.containerConditions}>
          <div className={styles.condition}>
            <i class="fa-solid fa-truck-fast fa-2xl"></i>
            <div>
              <h5>free shipping</h5>
              <p>for purchases over $5000</p>
            </div>
          </div>
          <div className={styles.condition}>
            <i class="fa-regular fa-credit-card fa-2xl"></i>
            <div>
              <h5>interest free installments</h5>
              <p>With all credit cards</p>
            </div>
          </div>
          <div className={styles.condition}>
          <i class="fa-solid fa-percent fa-2xl"></i>
            <div>
              <h5>discount</h5>
              <p>Get 15% OFF cash payment</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default Products;