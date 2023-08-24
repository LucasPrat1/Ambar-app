import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Shared'
import { Rating } from '@mui/material'
import styles from './card.module.css'


const Card = ({ product }) => {
  return (
    <div className={styles.card} >
      <h3>{product.name}</h3>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <p className={styles.price} >$ {product.price}</p>
      <p className={styles.category} >{product.category}</p>
      <p className={styles.description} >{product.description}</p>
      <div className={styles.rating}>
        <p>Rating</p>
        <Rating
          defaultValue={product.rating}
          value={product.rating}
          readOnly
        />
      </div>
      <Link to={`/product/${product._id}`}>
        <Button color={'#ffffff'} backgroundColor={'#000000'}>Buy Now</Button>
      </Link>
    </div>
  )
}

export default Card
