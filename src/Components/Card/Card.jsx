import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Rating } from '../Shared'
import styles from './card.module.css'


const Card = ({ product }) => {
  console.log('product', product)
  return (
    <div className={styles.card} >
      <h3>{product.name}</h3>
      <img src={product.image} alt="product"></img>
      <p className={styles.price} >$ {product.price}</p>
      <p className={styles.category} >{product.category}</p>
      <p className={styles.description} >{product.description}</p>
      <Rating rating={product.rating} numReviews={product.numReviews} />
      <Link to={`/products/${product._id}`}><Button color={'#ffffff'}>Buy Now</Button></Link>
    </div>
  )
}

export default Card


// brand
// :
// "Puma"
// category
// :
// "Pants"
// countInStock
// :
// 5
// createdAt
// :
// "2023-04-17T16:41:54.293Z"
// description
// :
// "high quality product"
// image
// :
// "/images/p4.jpg"
// images
// :
// []
// name
// :
// "Adidas Fit Pant"
// numReviews
// :
// 10
// price
// :
// 65
// rating
// :
// 4.5
// slug
// :
// "adidas-fit-pant"
// updatedAt
// :
// "2023-04-17T16:41:54.293Z"
// __v
// :
// 0
// _id
// :
// "643d76d2b57ec5b6088c2460"