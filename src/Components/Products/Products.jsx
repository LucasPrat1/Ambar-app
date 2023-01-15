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
      {isLoading ? ( <Loader show={isLoading} />
      ) : (
        <section className={styles.card}>
          <div>
            <h2>Lates Products</h2>
            <div className={styles.containerButtons}>
              <Button onClick={() => setFilter(data)}>All</Button>
              <Button onClick={() => filterProducts("men's clothing")}>Men's Clothing</Button>
              <Button onClick={() => filterProducts("women's clothing")}>Women's Clothing</Button>
              <Button onClick={() => filterProducts("jewelery")}>Jewelery</Button>
              <Button onClick={() => filterProducts("electronics")}>Electronics</Button>
            </div>
          </div>
          {mounted ? (
            <div className={styles.containerCards}>
              {filter.map((product) => {
                return <Card product={product} />
              })}
            </div>
          ) : (
            <Loader show={isLoading} />
          )
          }
        </section>
      )}
    </>
  )
};

export default Products;