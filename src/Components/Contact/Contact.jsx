import React, { useState } from 'react'
import styles from './contact.module.css'
import joi from 'joi';
import { useDispatch } from 'react-redux';
import { Input, Button, Alert, Loader } from '../Shared/index';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import { contactMessage } from '../../redux/auth/thunks';

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('')
  const [childrenAlert, setChildrenAlert] = useState('')

  const schema = joi.object({
    name: joi
      .string()
      .regex(/^[a-zA-Z_ ]*$/)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'Name must contain only letters',
        'string.min': 'Name is too short',
        'string.max': 'Name is too long',
        'string.empty': 'This field is required'
      })
      .required(),
    phone: joi.number().min(1000000000).max(9999999999).required()
      .messages({
        'number.min': 'Phone number must be 10 digits long',
        'number.max': 'Phone number must be no more than 10 digits long',
      }),
    email: joi
      .string()
      .regex(
        /^[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
      .messages({
        'string.pattern.base': 'Invalid email',
        'string.empty': 'This field is required'
      })
      .required(),
    subject: joi
      .string()
      .regex(/^[a-zA-Z0-9\s]*$/)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'subject must contain only letters and numbers',
        'string.min': 'subject is too short',
        'string.max': 'subject is too long',
        'string.empty': 'This field is required'
      })
      .required(),
    message: joi
      .string()
      .min(3)
      .max(300)
      .messages({
        'string.min': 'message is too short',
        'string.max': 'message is too long',
        'string.empty': 'This field is required'
      })
      .required(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    if (window.confirm("Are you sure you want to send this message?")) {
      setIsLoading(true);
      try {
        const resp = await dispatch(contactMessage(data));
        if (resp.error) {
          setChildrenAlert(resp.message);
          setTypeAlert('error');
          setShowAlert(true);
          setIsLoading(false);
        } else {
          setChildrenAlert(resp.message);
          setTypeAlert('success');
          setShowAlert(true);
          setIsLoading(false);
          setTimeout(() => {
            navigate('/')
          }, 1500);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Loader show={isLoading} />
      <Alert show={showAlert} setShow={setShowAlert} type={typeAlert}>{childrenAlert}</Alert>
      <h2 className={styles.title}>Contact Us</h2>
      <section className={styles.container}>
        <div className={styles.containerForm}>
          <form>
            <Input
              type={'text'}
              name={'name'}
              label={'Name'}
              register={register}
              error={errors.name?.message}
            />
            <Input
              type={'number'}
              name={'phone'}
              label={'Phone Number'}
              register={register}
              error={errors.phone?.message}
            />
            <Input
              type={'email'}
              name={'email'}
              label={'Email'}
              register={register}
              error={errors.email?.message}
            />
            <Input
              type={'text'}
              name={'subject'}
              label={'Subject'}
              register={register}
              error={errors.subject?.message} />
            <Input
              type={'textarea'}
              name={'message'}
              label={'Message'}
              register={register}
              error={errors.message?.message} />
          </form>
          <Button width={'6rem'} color={'#fff'} backgroundColor={'#808080'} onClick={handleSubmit(onSubmit)}>Sent</Button>
        </div>
        <div className={styles.containerInfo}>
          <h4>AMBAR SHOP</h4>
          <p><i className="fa-solid fa-location-dot"></i>  Salvat 111, Rosario, Argentina</p>
          <p><i className="fa-solid fa-phone"></i>  (0341) 1111111</p>
          <a className={styles.whatsapp} target='_blank' rel="noopener noreferrer"
            href="https://wa.me/543416111111?text=Hola%20Ambar,%20visite%20su%20sitio%20web%20y%20quiero%20realizarles%20una%20consulta">
            <p><i className="fa-brands fa-whatsapp fa-lg"></i>  3416111111</p>
          </a>
          <p><i className="fa-solid fa-envelope"></i>  info@ambar.com</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37893.7464969725!2d-60.68814749601126!3d-32.914936592330555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6535273252fd1%3A0xe728a13a2a3ac80b!2sComercial%20Nevada!5e0!3m2!1ses-419!2sar!4v1687908370711!5m2!1ses-419!2sar"
            width="400" height="300" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='location-map' >
          </iframe>
        </div>
      </section>
    </>
  )
}

export default Contact