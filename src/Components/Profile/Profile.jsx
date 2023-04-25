import React, { useState } from 'react'
import styles from './profile.module.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Loader, Modal } from '../Shared';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { editUser } from '../../redux/auth/thunks';

const Profile = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user)
  // const { uid } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [edit, setEdit] = useState(false)

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
    city: joi
      .string()
      .regex(/^[a-zA-Z0-9\s]*$/)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'City must contain only letters and numbers',
        'string.min': 'City is too short',
        'string.max': 'City is too long',
        'string.empty': 'This field is required'
      })
      .required(),
    address: joi
      .string()
      .regex(/^[a-zA-Z0-9\s]*$/)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'Address must contain only letters and numbers',
        'string.min': 'Address is too short',
        'string.max': 'Address is too long',
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
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      city: user.city,
      address: user.address
    }
  });

  const onSubmit = async (data) => {
    console.log("data en onSubmit", data)
    try {
      const resp = await dispatch(editUser(data, user._id));
      if (resp.error) {
        setChildrenModal(resp.message);
        setShowModal(true);
      } else {
        setChildrenModal('Edited successfully');
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <Loader show={isLoading} />
      <Modal show={showModal} handleClose={() => { setShowModal(false); navigate('/') }} >
        {childrenModal}
      </Modal>
      <div className={styles.container}>
        <h2>My Profile</h2>
        {edit ? (
          <>
            <form className={styles.form}>
              <Input
                type={'text'}
                name={'name'}
                label={'Name'}
                register={register}
                error={errors.name?.message} />
              <Input
                type={'number'}
                name={'phone'}
                label={'Phone Number'}
                register={register}
                error={errors.phone?.message} />
              <Input
                type={'email'}
                name={'email'}
                label={'Email'}
                register={register}
                error={errors.email?.message} />
              <Input
                type={'text'}
                name={'city'}
                label={'City'}
                register={register}
                error={errors.city?.message} />
              <Input
                type={'text'}
                name={'address'}
                label={'Address'}
                register={register}
                error={errors.address?.message} />
            </form>
            <div className={styles.containerButtons}>
              <Button width={'100px'} onClick={handleSubmit(onSubmit)}>Confirm</Button>
              <Button width={'100px'} onClick={() => setEdit(false)}>Cancel</Button>
            </div>
          </>
        ) : (
          <>
            <form className={styles.form}>
              <Input
                disabled
                type={'text'}
                name={'name'}
                label={'Name'}
                register={register}
                error={errors.name?.message} />
              <Input
                disabled
                type={'number'}
                name={'phone'}
                label={'Phone Number'}
                register={register}
                error={errors.phone?.message} />
              <Input
                disabled
                type={'email'}
                name={'email'}
                label={'Email'}
                register={register}
                error={errors.email?.message} />
              <Input
                disabled
                type={'text'}
                name={'city'}
                label={'City'}
                register={register}
                error={errors.city?.message} />
              <Input
                disabled
                type={'text'}
                name={'address'}
                label={'Address'}
                register={register}
                error={errors.address?.message} />
            </form>
            <div className={styles.containerButtons}>
              <Button width={'100px'} onClick={() => setEdit(true)}>Edit</Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Profile