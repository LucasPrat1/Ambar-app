import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader, Modal } from '../Shared'
import styles from './abmproducts.module.css'
import { setMessageAlert, setShowAlert, setTypeAlert } from '../../redux/alert/actions'
import { getProducts } from '../../redux/products/thunks'
import { Button, Switch } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditProduct from '../EditProduct/EditProduct'

const ABMProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);

  const [showModal, setShowModal] = useState(false)
  const [selectedProd, setSelectedProd] = useState({})

  useEffect(() => {
    if (!auth.token || !auth.user.isAdmin) {
      dispatch(setTypeAlert('error'));
      dispatch(setMessageAlert('ERROR: you are not authorized'))
      dispatch(setShowAlert(true))
      navigate('/signin');
    }
  }, [auth.token, auth.user.isAdmin, dispatch, navigate])

  useEffect(() => {
    if (products.list.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.list.length])

  const columns = [
    { field: '_id', headerName: 'ID', flex: 2 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'stock', headerName: 'Stock', type: 'number', flex: 0.5 },
    { field: 'price', headerName: 'Price', type: 'number', flex: 0.5 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      renderCell: (params) => (
        <Switch
          checked={params.value}
        />
      ),
    },
  ];

  const handleRowClick = (params) => {
    setSelectedProd(params.row)
    setShowModal(true)
  };

  return (
    auth?.isLoading ? <Loader show={auth.isLoading} /> :
      auth?.user?.isLoading ? <Loader show={auth.user.isLoading} /> :
        <section className={styles.section}>
          <div className={styles.container1}>
            <h2>PRODUCTS</h2>
            <Button
              variant="contained"
              size="small"
              startIcon={<i className="fa-solid fa-circle-plus fa-xs" />}
              onClick={() => { setSelectedProd({}); setShowModal(true) }}
            >
              Add
            </Button>
          </div>
          <div className={styles.containerTable} >
            <DataGrid
              rows={products.list}
              columns={columns}
              getRowId={(row) => row._id}
              onRowClick={handleRowClick}
              loading={products.isLoading}
              slots={{ toolbar: GridToolbar }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
            />
          </div>
          <Modal
            size={{ width: "100%", height: "100%" }}
            show={showModal}
            handleClose={() => setShowModal(false)}
          >
            <EditProduct selectedProd={selectedProd} setShowModal={setShowModal} />
          </Modal >
        </section>
  )
}

export default ABMProducts