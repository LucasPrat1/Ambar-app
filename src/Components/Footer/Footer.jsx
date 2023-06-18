import React from 'react'
import styles from './footer.module.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerSpans}>
        <span className={styles.social}>
          <p> AMBAR </p>
          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/aroma.ambar" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram fa-2xl"></i></a>
            <a href="http://www.instagram.com/aroma.ambar" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook fa-2xl"></i></a>
            <a href="http://www.instagram.com/aroma.ambar" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-twitter fa-2xl"></i></a>
          </div>
        </span>
        <span className={styles.info}>
          <p><i class="fa-solid fa-location-dot"></i>  Salvat 111, Rosario, Argentina</p>
          <p><i className="fa-solid fa-phone"></i>  (0341) 1111111</p>
          <a className={styles.whatsapp} target='_blank' rel="noopener noreferrer" href="https://wa.me/543416111111?text=Hola%20Ambar,%20visite%20su%20sitio%20web%20y%20quiero%20realizarles%20una%20consulta">
            <p><i class="fa-brands fa-whatsapp fa-lg"></i>  3416111111</p>
          </a>
          <Link to={'/contact'} className={styles.mail}>
            <p><i className="fa-solid fa-envelope"></i>  info@ambar.com</p>
          </Link>
        </span>
      </div>
      <p className={styles.copyright}>© Copyright AMBAR. All Rights Reserved</p>
    </div>
  )
}

export default Footer