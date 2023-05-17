import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addItem, clearItems, deleteItem } from '../../redux/cart/thunks'
import { Button, Alert, Modal } from '../Shared'
import styles from './cart.module.css'
import Checkout from '../Checkout/Checkout'


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (!token) {
      navigate('/signin')
    }
  }, [navigate, token])


  const [showCheckout, setShowCheckout] = useState(false)

  const [showAlert, setShowAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('')
  const [childrenAlert, setChildrenAlert] = useState('')

  const cart = useSelector((state) => state.cart.cart)
  let total = 0;

  const handleAdd = async (item) => {
    const resp = await dispatch(addItem(item))
    if (!resp.error) {
      setChildrenAlert(resp.message)
      setTypeAlert('success')
      setShowAlert(true);
    } else {
      setChildrenAlert(resp.message)
      setTypeAlert('error')
      setShowAlert(true);
    }
  }

  const handleDelete = async (itemId) => {
    const resp = await dispatch(deleteItem(itemId))
    if (!resp.error) {
      setChildrenAlert(resp.message)
      setTypeAlert('warning')
      setShowAlert(true);
    } else {
      setChildrenAlert(resp.message)
      setTypeAlert('error')
      setShowAlert(true);
    }
  }

  const handleEmptyCart = async () => {
    try {
      if (window.confirm('Are you sure you want to empty your cart?')) {
        const resp = await dispatch(clearItems())
        if (!resp.error) {
          setChildrenAlert(resp.message);
          setTypeAlert('success');
          setShowAlert(true);
        } else {
          setChildrenAlert(resp.message);
          setTypeAlert('error');
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.error(error)
    }
  }


return (
  <>
    <div className={styles.container}>
      {cart.length === 0 ? (
        <>
          <h2>You Cart is Empty</h2>
          <Link to={'/products'} ><p>Continue Shopping</p></Link>
        </>
      ) : (
        <>
          <Alert show={showAlert} setShow={setShowAlert} type={typeAlert}>{childrenAlert}</Alert>
          <h2>My Cart</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th></th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                total += item.price * item.qty
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>
                    <td>
                      {item.qty}
                    </td>
                    <td>
                      $ {item.price.toFixed(2)}
                    </td>
                    <td>
                      $ {(item.price * item.qty).toFixed(2)}
                    </td>
                    <td>
                      <Button width={'2rem'} height={'2rem'} borderRadius={'50%'} onClick={() => handleAdd(item)}>
                        <i className="fa-solid fa-plus" />
                      </Button>
                    </td>
                    <td>
                      <Button width={'2rem'} height={'2rem'} borderRadius={'50%'} onClick={() => handleDelete(item._id)}>
                        <i className="fa-solid fa-minus"></i>
                      </Button>
                    </td>
                  </tr>
                )
              })
              }
            </tbody>
            <tfoot>
              <tr className={styles.total}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>TOTAL $ {total}</td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className={styles.containerButtonCheckout}>
            <Button onClick={() => navigate(-1)} width={'12rem'} >
              <i className="fa-solid fa-backward" /> Continue Shopping
            </Button>
            <Button width={'12rem'} onClick={() => handleEmptyCart()}>
              <i className="fa-solid fa-trash" /> Empty Cart
            </Button>
            <Button width={'12rem'} backgroundColor={'#030453'} color={'#fff'} onClick={() => setShowCheckout(true)}>
              <i className="fa-solid fa-shopping-cart" /> Checkout
            </Button>
          </div>
        </>
      )}
    </div>
    <Modal show={showCheckout} handleClose={() => setShowCheckout(false)}>
      <Checkout total={total} />
    </Modal>
  </>
)
}

export default Cart