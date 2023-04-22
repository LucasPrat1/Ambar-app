import React, { useState } from 'react'
import styles from './signIn.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi';
import { login } from '../../redux/auth/thunks';
import { Button, Input, Loader, Modal } from '../Shared';

const SingIn = () => {
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = Joi.object({
    email: Joi
      .string()
      .required()
      .regex(
        /^[a-z0-9]+(?:\.[a-z0-9]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      )
      .messages({
        'string.pattern.base': 'The email is invalid',
        'string.empty': 'This field is required'
      })
      .required(),
    password: Joi
      .string()
      .min(6)
      .required()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers',
        'string.min': 'Password is too short',
        'string.empty': 'This field is required'
      })
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
    try {
      const user = await dispatch(login(data));
      if (user.type === 'LOGIN_ERROR') {
        setChildrenModal(<p className={styles.invalidEmail}>Invalid email or password</p>);
        setShowModal(true);
        throw user.payload;
      }
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Loader show={isLoading} />
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
      >
        {childrenModal}
      </Modal>
      <div className={styles.container}>
        <h2>Sing In</h2>
        <form className={styles.form}>
          <Input
            type={'email'}
            name={'email'}
            label={'Email'}
            register={register}
            error={errors.email?.message} />
          <Input
            type={'password'}
            name={'password'}
            label={'Password'}
            register={register}
            error={errors.password?.message} />
          <Button width={'50%'} maxWidth={'200px'} onClick={handleSubmit(onSubmit)}>Sign In</Button>
        </form>
        <p>New customer?
          <Link to={'/signup'}> Create your account</Link>
        </p>
      </div>
    </>
  )
}

export default SingIn
