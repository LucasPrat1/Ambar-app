import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader, Modal } from '../Shared'
import styles from './abmorders.module.css'
import { setMessageAlert, setShowAlert, setTypeAlert } from '../../redux/alert/actions'
import { Button, Switch } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getOrders } from '../../redux/order/thunks'
import EditOrder from '../EditOrder/EditOrder'

const ABMOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState({})

  useEffect(() => {
    if (!auth.token || !auth.user.isAdmin) {
      dispatch(setTypeAlert('error'));
      dispatch(setMessageAlert('ERROR: you are not authorized'))
      dispatch(setShowAlert(true))
      navigate('/signin');
    }
  }, [auth.token, auth.user.isAdmin, dispatch, navigate])

  useEffect(() => {
    if (order.list.length === 0) {
      dispatch(getOrders())
    }
  }, [dispatch, order.list.length])

  const columns = [
    { field: '_id', headerName: 'ID', flex: 2 },
    {
      field: 'user',
      headerName: 'Name',
      flex: 1,
      renderCell: (params) => {return params.value.name}
    },
    { field: 'createdAt', headerName: 'Date', flex: 1 },
    { field: 'deliveryOptions', headerName: 'Delivery Options', flex: 1 },
    {
      field: 'isDelivered',
      headerName: 'Is Delivered',
      flex: 0.5,
      renderCell: (params) => (
        <Switch
          checked={params.value}
        />
      ),
    },
    { field: 'total', headerName: 'Total', type: 'number', flex: 0.5 },
    {
      field: 'isPaid',
      headerName: 'Is Paid',
      flex: 0.5,
      renderCell: (params) => (
        <Switch
          checked={params.value}
        />
      ),
    },
  ];

  const handleRowClick = (params) => {
    setSelectedOrder(params.row)
    setShowModal(true)
  };

  return (
    auth?.isLoading ? <Loader show={auth.isLoading} /> :
      auth?.user?.isLoading ? <Loader show={auth.user.isLoading} /> :
        <section className={styles.section}>
          <div className={styles.container1}>
            <h2>ORDERS</h2>
            <Button
              variant="contained"
              size="small"
              startIcon={<i className="fa-solid fa-circle-plus fa-xs" />}
              // onClick={() => { setSelectedOrder({}); setShowModal(true) }}
            >
              Add
            </Button>
          </div>
          <div className={styles.containerTable} >
            <DataGrid
              rows={order.list}
              columns={columns}
              getRowId={(row) => row._id}
              onRowClick={handleRowClick}
              loading={order.isLoading}
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
            <EditOrder selectedOrder={selectedOrder} setShowModal={setShowModal} />
          </Modal >
        </section>
  )
}

export default ABMOrders