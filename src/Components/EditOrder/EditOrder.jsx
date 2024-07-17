import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { orderEditSchema } from '../../Schemas/schemas';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './editOrder.module.css'
import { setMessageAlert, setShowAlert, setTypeAlert } from '../../redux/alert/actions'
import { Button, TextField, Switch, FormControlLabel } from '@mui/material'
import { addOrder, editOrder } from '../../redux/order/thunks';
import ItemsTable from './ItemsTable';

const EditOrder = ({ selectedOrder, setShowModal }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: selectedOrder.user.name,
      city: selectedOrder.user.city,
      email: selectedOrder.user.email,
      phone: selectedOrder.user.phone,

      deliveryOptions: selectedOrder.deliveryOptions,
      deliveryAddress: selectedOrder.deliveryAddress && selectedOrder.deliveryAddress,
      isDelivered: selectedOrder.isDelivered,

      paymentOptions: selectedOrder.paymentOptions,
      total: selectedOrder.total,
      isPaid: selectedOrder.isPaid,
    },
    resolver: joiResolver(orderEditSchema),
  });

  const onSubmit = async (data) => {
    const newOrder = {
      ...selectedOrder,
      isDelivered: data.isDelivered,
      isPaid: data.isPaid,
    };
    console.log('newOrder', newOrder);
    try {
      if (Object.keys(selectedOrder).length !== 0) {
        // EDIT
        if (window.confirm('Do you want to save changes?')) {
          const resp = await dispatch(editOrder(data, selectedOrder._id));
          if (resp.error) {
            dispatch(setMessageAlert(resp.message));
            dispatch(setTypeAlert('error'));
            dispatch(setShowAlert(true));
            throw resp
          } else {
            dispatch(setMessageAlert(resp.message));
            dispatch(setTypeAlert('success'));
            dispatch(setShowAlert(true));
            setShowModal(false);
          }
        }
      } else {
        // ADD
        if (window.confirm('Are you sure you want to add this Order?')) {
          const resp = await dispatch(addOrder(data));
          if (resp.error) {
            dispatch(setMessageAlert(resp.message));
            dispatch(setTypeAlert('error'));
            dispatch(setShowAlert(true));
            throw resp
          } else {
            dispatch(setMessageAlert(resp.message));
            dispatch(setTypeAlert('success'));
            dispatch(setShowAlert(true));
            setShowModal(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={styles.form}>
      <h3>{selectedOrder?._id ? `EDIT ORDER NUM: ${selectedOrder._id} ` : 'ADD NEW ORDER'} </h3>

      Comprador:
      <div className={styles.containerInput}>
        <TextField
          id="filled-error-helper-text"
          name="name"
          label="Nombre"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          variant="filled"
          size="small"
          className={styles.inputUser}
          disabled
        />
        <TextField
          id="filled-error-helper-text"
          name="city"
          label="Ciudad"
          {...register("city")}
          error={!!errors.city}
          helperText={errors.city?.message}
          variant="filled"
          size="small"
          className={styles.inputUser}
          disabled
        />
        <TextField
          id="filled-error-helper-text"
          name="email"
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          variant="filled"
          size="small"
          className={styles.inputUser}
          disabled
        />
        <TextField
          id="filled-error-helper-text"
          name="phone"
          label="Teléfono"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          variant="filled"
          size="small"
          className={styles.inputUser}
          disabled
        />
      </div>

      Entrega:
      <div className={styles.containerInput}>
        <TextField
          id="filled-error-helper-text"
          name="deliveryOptions"
          label="Delivery Options"
          {...register("deliveryOptions")}
          error={!!errors.deliveryOptions}
          helperText={errors.deliveryOptions?.message}
          variant="filled"
          size="small"
          className={styles.inputText}
          disabled
        />
        {selectedOrder.deliveryOptions === "Home Delivery" &&
          <TextField
            id="filled-error-helper-text"
            name="deliveryAddress"
            label="Dirección entrega"
            {...register("deliveryAddress")}
            error={!!errors.deliveryAddress}
            helperText={errors.deliveryAddress?.message}
            variant="filled"
            size="small"
            className={styles.inputText}
            disabled
          />
        }
        <FormControlLabel
          control={
            <Switch
              name="isDelivered"
              {...register("isDelivered")}
              defaultChecked={selectedOrder?.isDelivered}
            />
          }
          label="Entregado"
          labelPlacement="top"
          className={styles.inputStatus}
        />
      </div>

      Pago:
      <div className={styles.containerInput}>
        <TextField
          id="filled-error-helper-text"
          name="paymentOptions"
          label="Forma de pago"
          {...register("paymentOptions")}
          error={!!errors.paymentOptions}
          helperText={errors.paymentOptions?.message}
          variant="filled"
          size="small"
          className={styles.inputText}
          disabled
        />
        <TextField
          id="filled-error-helper-text"
          name="total"
          label="Total"
          type="number"
          {...register("total")}
          error={!!errors.total}
          helperText={errors.total?.message}
          variant="filled"
          size="small"
          className={styles.inputText}
          disabled
        />
        <FormControlLabel
          control={
            <Switch
              name="isPaid"
              {...register("isPaid")}
              defaultChecked={selectedOrder?.isPaid}
            />
          }
          label="Entregado"
          labelPlacement="top"
          className={styles.inputStatus}
        />
      </div>

      Items:
      <div className={styles.containerInput} >
        <ItemsTable items={selectedOrder?.items} />
      </div>

      <div className={styles.containerInput} >
        <Button variant="contained" color='error' size="small" onClick={() => setShowModal(false)} className={styles.inputUser}>
          Cancelar
        </Button>
        <Button variant="contained" color='success' size="small" onClick={handleSubmit(onSubmit)} className={styles.inputUser}>
          Confirmar
        </Button>
      </div>
    </form>
  )
}

export default EditOrder