import React from 'react'
import styles from './about.module.css'

const About = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>About Us</h2>
      <p className={styles.p1}>
        En <strong>AMBAR</strong> atendemos ferreterías, corralones, casas de sanitarios, etc. Con una gran variedad
        de artículos, y amplio stock en sanitarios, gas, cortineria y ferretería general. Convenimos las entregas con
        transporte propio y terceros para agilizar y acelerar las entregas de los pedidos deacuerdo a las zonas del cliente.
      </p>
      <p className={styles.p2}>
        Nuestra especialidad son repuestos y accesorios para Sanitarios, griferias, tuberias y accesorios de PVC, PPN,
        PPL, fusion, epoxi, ,sigas. magueras, conexiones, cortineria, jardin y ferreteria en general.
      </p>
      <p className={styles.p3}>
        Atencion personalizada y capacitada para brindar el mejor servicio con Vendores en: Santa Fé, Córdoba, Corrientes, Chaco, Entre Ríos, Formosa, Buenos Aires.
        Y a través de venta Telefónica a todo el pais.
      </p>
      <div className={styles.containerImg} >
        <img src=".\images\v5.jpeg" alt="velas" className={styles.img} />
      </div>
    </section>
  )
}

export default About