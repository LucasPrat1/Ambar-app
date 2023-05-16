import React, { useState } from 'react'
import styles from './checkout.module.css'
import { useForm } from 'react-hook-form';
import { Input, Loader, Button, Modal, Alert } from '../Shared';
import { useDispatch, useSelector } from 'react-redux';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { addOrder, getOrdersId } from '../../redux/order/thunks';
import { useNavigate } from 'react-router-dom';
import { clearItems } from '../../redux/cart/thunks';
import { PDFViewer } from '@react-pdf/renderer';
import OrderPDF from '../OrderPDF/OrderPDF';


const Checkout = ({ total }) => {
  const isLoading = useSelector((state) => state.order.isLoading);
  const cart = useSelector((state) => state.cart.cart)
  const user = useSelector((state) => {
    if (state.auth.token) {
      return state.auth.user
    }
  })

  const [showAlert, setShowAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('')
  const [childrenAlert, setChildrenAlert] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [childrenModal, setChildrenModal] = useState('')

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
    deliveryAddress: joi
      .string()
      .regex(/^[a-zA-Z0-9\s]*$/)
      .min(3)
      .max(30)
      .messages({
        'string.pattern.base': 'Address must contain only letters and numbers',
        'string.min': 'Address is too short',
        'string.max': 'Address is too long',
        'string.empty': 'This field is required'
      }),
    deliveryOptions: joi.string().required(),
    paymentOptions: joi.string().required()
  });

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      deliveryAddress: user.address
    },
    resolver: joiResolver(schema),
  });


  const onSubmit = async (data) => {
    const newOrder = {
      user: user._id,
      deliveryOptions: data.deliveryOptions,
      deliveryAddress: data.deliveryOptions === 'Home Delivery' && data.deliveryAddress,
      isDelivered: false,
      paymentOptions: data.paymentOptions,
      isPaid: false,
      total,
      items: cart.map((item) => { return { product: item._id, qty: item.qty } }),
    }
    if (window.confirm('Do you want to confirm your order?')) {
      try {
        const resp = await dispatch(addOrder(newOrder));
        if (resp.error) {
          throw resp
        } else {
          const orderAdded = await dispatch(getOrdersId(resp.data._id));

          setChildrenAlert(resp.message)
          setTypeAlert('success')
          setShowAlert(true);
          setChildrenModal(
            <PDFViewer width={'800px'} height={'500px'}>
              <OrderPDF order={orderAdded.data} />
            </PDFViewer>
          )
          setShowModal(true)
          dispatch(clearItems());
          // window.open(`/order/${resp.data._id}`, '_blank', 'noreferrer')
        }
      } catch (error) {
        console.error(error);
        setChildrenModal(error.message);
        setShowModal(true);
      }
    }
  };

  return (
    <>
      <Loader show={isLoading} />
      <Modal show={showModal} handleClose={() => { setShowModal(false); navigate('/') }}>{childrenModal}</Modal>
      <Alert show={showAlert} setShow={setShowAlert} type={typeAlert}>{childrenAlert}</Alert>
      <div>
        <form className={styles.form}>
          <h3>finalize your purchase</h3>
          <div className={styles.containerUserInfo}>
            <h4>User Info</h4>
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
          </div>
          <div className={styles.containerDeliveryInfo}>
            <h4>Delivery Info</h4>
            <Input
              type={'radio'}
              name={'deliveryOptions'}
              label={'Take Away'}
              valueRadio={'Take Away'}
              register={register}
              error={errors.deliveryOptions?.message} />
            <Input
              type={'radio'}
              name={'deliveryOptions'}
              label={'Home Delivery'}
              valueRadio={'Home Delivery'}
              register={register}
              error={errors.deliveryOptions?.message} />
            {watch('deliveryOptions') === 'Home Delivery' && (
              <Input
                type={'text'}
                name={'deliveryAddress'}
                label={'Delivery Address'}
                register={register}
                error={errors.deliveryAddress?.message} />
            )}
          </div>
          <div className={styles.containerPaidInfo}>
            <h4>Payment Info</h4>
            <Input
              type={'select'}
              name={'paymentOptions'}
              label={'Payment Options'}
              valueOptions={['Credit card', 'Debit card', 'Bank transfer', 'Cash']}
              register={register}
              error={errors.paymentOptions?.message} />
          </div>
          <Button backgroundColor={'#030453'} color={'#fff'} onClick={handleSubmit(onSubmit)}>
            Confirm
          </Button>
        </form>
      </div>
    </>
  )
}

export default Checkout
