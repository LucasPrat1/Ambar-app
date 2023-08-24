import React, { useState, useEffect } from 'react'
import Card from '../Card/Card';
import styles from './products.module.css'
import { Loader } from '../../Components/Shared/index';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/products/thunks';
import { Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

const Products = () => {
  const dispatch = useDispatch();

  const [brandSelected, setBrandSelected] = useState('');
  const [categorySelected, setCategorySelected] = useState('');

  const [dataActive, setDataActive] = useState([]);
  const [filter, setFilter] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const isLoading = useSelector((state) => state.products.isLoading);
  const data = useSelector((state) => state.products.list);

  useEffect(() => {
    const active = data.filter((prod) => prod.status === true);
    setDataActive(active);
    setFilter(active);
    setMounted(true);
  }, [data])

  const categoryList = new Set();
  const brandList = new Set();

  dataActive.forEach(prod => {
    categoryList.add(prod.category);
    brandList.add(prod.brand);
  });

  const filterProducts = () => {
    let filterList = [];

    if (brandSelected) {
      if (categorySelected) {
        filterList = dataActive.filter((prod) => prod.brand === brandSelected && prod.category === categorySelected)
      } else {
        filterList = dataActive.filter((prod) => prod.brand === brandSelected)
      }
    } else {
      if (categorySelected) {
        filterList = dataActive.filter((prod) => prod.category === categorySelected)
      } else {
        filterList = dataActive;
      }
    }

    setFilter(filterList);
  }

  return (
    <>
      <Loader show={isLoading} />
      <section className={styles.products}>
        <div>
          <h2>Featured Products</h2>
          <div className={styles.containerButtons}>
            <FormControl>
              <InputLabel id="category-label" >Category</InputLabel>
              <Select
                id='category'
                labelId='category-label'
                label='Category'
                placeholder='Category'
                className={styles.select}
                value={categorySelected}
                onChange={(e) => setCategorySelected(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {[...categoryList].map((cat) => {
                  return (
                    <MenuItem
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </MenuItem>)
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="brand-label" >Brand</InputLabel>
              <Select
                id='brand'
                labelId='brand-label'
                label='Brand'
                placeholder='Brand'
                className={styles.select}
                value={brandSelected}
                onChange={(e) => setBrandSelected(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {[...brandList].map((br) => {
                  return (
                    <MenuItem
                      key={br}
                      value={br}
                    >
                      {br}
                    </MenuItem>)
                })}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => filterProducts()}>Apply Filters</Button>
            <Button variant="outlined" onClick={() => setFilter(dataActive)}>Clear Filters</Button>
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
            <i className="fa-solid fa-truck-fast fa-2xl"></i>
            <div>
              <h5>free shipping</h5>
              <p>for purchases over $5000</p>
            </div>
          </div>
          <div className={styles.condition}>
            <i className="fa-regular fa-credit-card fa-2xl"></i>
            <div>
              <h5>interest free installments</h5>
              <p>With all credit cards</p>
            </div>
          </div>
          <div className={styles.condition}>
            <i className="fa-solid fa-percent fa-2xl"></i>
            <div>
              <h5>discount</h5>
              <p>Get 15% OFF cash payment</p>
            </div>
          </div>
        </div>
      </section >
    </>
  )
};

export default Products;