import React from 'react'
import Products from '../Products/Products';
import styles from './home.module.css'

const Home = () => {
	return (
		<>
		<div className={styles.container}>
			<div className={styles.containerText} >
				<h1>New season arrivals</h1>
			</div>
		</div>
		<Products/>
		</>
	)
}

export default Home;