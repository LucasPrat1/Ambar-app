import React from 'react'
import Products from '../Products/Products';
import styles from './home.module.css'

const Home = () => {
	return (
		<>
			<section className={styles.container}>
				<div className={styles.containerText} >
					<h1>New season arrivals</h1>
				</div>
			</section>
			<Products />
		</>
	)
}

export default Home;