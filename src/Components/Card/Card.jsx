import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../Shared'
import styles from './card.module.css'

const Card = ({ product }) => {
  return (
    <div className={styles.card} >
      <h3>{product.title}</h3>
      <img src={product.image} alt="product"></img>
      <p className={styles.price} >$ {product.price}</p>
      <p className={styles.category} >{product.category}</p>
      {/* <p className={styles.description} >{product.description}</p> */}
      <NavLink to={`/products/${product.id}`}><Button color={'#fff'}>Buy Now</Button></NavLink>
    </div>
  )
}

export default Card
