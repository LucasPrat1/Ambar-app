import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Rating } from '../Shared'
import styles from './card.module.css'


const Card = ({ product }) => {
  return (
    <div className={styles.card} >
      <h3>{product.name}</h3>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt="product"></img>
      </Link>
      <p className={styles.price} >$ {product.price}</p>
      <p className={styles.category} >{product.category}</p>
      <p className={styles.description} >{product.description}</p>
      <Rating rating={product.rating} numReviews={product.numReviews} />
      <Link to={`/product/${product._id}`}>
        <Button color={'#ffffff'} backgroundColor={'#000000'}>Buy Now</Button>
      </Link>
    </div>
  )
}

export default Card
