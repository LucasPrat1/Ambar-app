import React, { useState, useEffect } from 'react'
import styles from './profile.module.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Loader, Modal, Alert } from '../Shared';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { editUser } from '../../redux/auth/thunks';
import { getOrders } from '../../redux/order/thunks';
import { PDFViewer } from '@react-pdf/renderer';
import OrderPDF from '../OrderPDF/OrderPDF';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [navigate, token])

  const [showAlert, setShowAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('')
  const [childrenAlert, setChildrenAlert] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState('');
  const [edit, setEdit] = useState(false)
  const [ordersFilter, setOrdersFilter] = useState([])

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const authLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user)
  const ordersLoading = useSelector((state) => state.order.isLoading);
  const orders = useSelector((state) => state.order.list);

  useEffect(() => {
    setOrdersFilter(orders.filter((order) => order.user._id === user._id));
  }, [orders, user._id])

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
    try {
      const resp = await dispatch(editUser(data, user._id));
      if (resp.error) {
        setChildrenAlert(resp.message);
        setTypeAlert('error');
        setShowAlert(true);
      } else {
        setChildrenAlert(resp.message);
        setTypeAlert('success');
        setShowAlert(true);
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClick = (order) => {
    setChildrenModal(
      <PDFViewer width={'100%'} height={'100%'}>
        <OrderPDF order={order} />
      </PDFViewer>
    )
    setShowModal(true)
  }

  return (
    authLoading ? <Loader show={authLoading} /> :
      ordersLoading ? <Loader show={ordersLoading} /> :
        <section>
          <Modal
            show={showModal}
            handleClose={() => { setShowModal(false) }}
            size={{ width: "98%", height: "98%" }}
          >
            {childrenModal}
          </Modal>
          <Alert show={showAlert} setShow={setShowAlert} type={typeAlert}>{childrenAlert}</Alert>
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
                  <Button width={'6rem'} onClick={handleSubmit(onSubmit)}>Confirm</Button>
                  <Button width={'6rem'} onClick={() => setEdit(false)}>Cancel</Button>
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
                  <Button width={'6rem'} onClick={() => setEdit(true)}>Edit</Button>
                </div>
              </>
            )}
          </div>
          {
            ordersFilter.length > 0 &&
            <div className={styles.container}>
              <h2>My Orders</h2>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Is Delivered</th>
                    <th>Is Paid</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersFilter.map((order, index) => {
                    return (
                      <tr key={index} onClick={() => onClick(order)}>
                        <td>
                          {order._id}
                        </td>
                        <td>
                          {order.createdAt.slice(0, 10)}
                        </td>
                        <td>
                          {order.isDelivered.toString()}
                        </td>
                        <td>
                          {order.isPaid.toString()}
                        </td>
                        <td>
                          {order.total}
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </div>
          }
        </section>
  )
}

export default Profile