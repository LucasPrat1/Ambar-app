import React, { useState } from 'react'
import styles from './signUp.module.css'
import joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/auth/thunks';
import { Input, Button, Modal, Loader } from '../Shared/index';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useNavigate } from 'react-router-dom';

const SingUp = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    password: joi
      .string()
      .regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
      .min(6)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain letters and numbers',
        'string.empty': 'This field is required',
        'string.min': 'Password is too short'
      }),
    rPassword: joi
      .any()
      .equal(joi.ref('password'))
      .required()
      .messages({ 'any.only': 'Password does not match' }),
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
    console.log("data en onSubmit", data)
    try {
      const user = await dispatch(addUser(data));
      if (user.error) {
        setChildrenModal(user.message);
        setShowModal(true);
      } else {
        setChildrenModal('Register successfully');
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Loader show={isLoading} />
      <section>
        <Modal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
            navigate('/signin');
          }}
        >
          {childrenModal}
        </Modal>
        <div className={styles.container}>
          <h2>Sign Up</h2>
          <form className={styles.form}>
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
              type={'password'}
              name={'password'}
              label={'Password'}
              register={register}
              error={errors.password?.message}
            />
            <Input
              type={'password'}
              name={'rPassword'}
              label={'Repeat Password'}
              register={register}
              error={errors.rPassword?.message}
            />
            <Button width={'50%'} maxWidth={'200px'} onClick={handleSubmit(onSubmit)}>Confirm</Button>
            <p>Do you already have an account?
              <Link to={'/signin'}>  Log in now!</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SingUp