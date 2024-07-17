import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './editProduct.module.css'
import { setMessageAlert, setShowAlert, setTypeAlert } from '../../redux/alert/actions'
import { addProduct, editProduct } from '../../redux/products/thunks'
import { Button, TextField, Switch, FormControlLabel, Slider } from '@mui/material'
import { productSchema } from '../../Schemas/schemas';

const EditProduct = ({ selectedProd, setShowModal }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      name: selectedProd.name,
      brand: selectedProd.brand,
      category: selectedProd.category,
      description: selectedProd.description,
      price: selectedProd.price,
      stock: selectedProd.stock,
      rating: selectedProd.rating,
      status: selectedProd.status,
      // image: selectedProd.image,
    },
    resolver: joiResolver(productSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (Object.keys(selectedProd).length !== 0) {
        // EDIT
        if (window.confirm('Do you want to save changes?')) {
          const resp = await dispatch(editProduct(data, selectedProd._id));
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
        if (window.confirm('Are you sure you want to add this Product?')) {
          const resp = await dispatch(addProduct(data));
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
      <h3>{selectedProd?.name ? `EDIT PRODUCT: ${selectedProd.name.toUpperCase()} ` : 'ADD NEW PRODUCT'} </h3>

      <div className={styles.containerInput}>
        <TextField
          id="filled-error-helper-text"
          name="name"
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          variant="filled"
          size="small"
          className={styles.input}
        />

        <TextField
          id="filled-error-helper-text"
          name="brand"
          label="Brand"
          {...register("brand")}
          error={!!errors.brand}
          helperText={errors.brand?.message}
          variant="filled"
          size="small"
          className={styles.input}
        />

        <TextField
          id="filled-error-helper-text"
          name="category"
          label="Category"
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          variant="filled"
          size="small"
          className={styles.input}
        />

        <TextField
          id="filled-error-helper-text"
          name="description"
          label="Description"
          multiline
          maxRows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          variant="filled"
          size="small"
          className={styles.input}
        />

        <TextField
          id="filled-error-helper-text"
          name="price"
          label="Price"
          type="number"
          {...register("price")}
          error={!!errors.price}
          helperText={errors.price?.message}
          variant="filled"
          size="small"
          className={styles.input}
        />

        <TextField
          id="filled-error-helper-text"
          name="stock"
          label="Stock"
          type="number"
          {...register("stock")}
          error={!!errors.stock}
          helperText={errors.stock?.message}
          variant="filled"
          size="small"
          className={styles.input}
        />

        <FormControlLabel
          control={
            <Slider
              name='rating'
              marks
              max={5}
              min={1}
              size="small"
              valueLabelDisplay="on"
              defaultValue={selectedProd?.rating}
              {...register("rating")}
            />
          }
          label="Rating"
          labelPlacement="top"
          className={styles.input2}
        />

        <FormControlLabel
          control={
            <Switch
              name="status"
              {...register("status")}
              defaultChecked={selectedProd?.status}
            />
          }
          label="Status"
          labelPlacement="top"
          className={styles.input2}
        />

      </div>

      <TextField
        id="outlined-error-helper-text"
        name="image"
        label="Image"
        type='file'
        {...register("image")}
        error={!!errors.image}
        helperText={errors.image?.message || "Please select a product image"}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        className={styles.image}
      />

      <Button variant="contained" size="small" onClick={handleSubmit(onSubmit)}>
        Confirm
      </Button>
    </form>
  )
}

export default EditProduct