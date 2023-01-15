import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, deleteItem } from '../../redux/cart/thunks'
import { Button } from '../Shared'
import styles from './cart.module.css'


const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart)
  let total = 0;
  console.log('cart', cart)

  const handleDelete = async (itemId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete this item?")) {
      const res = await dispatch(deleteItem(itemId));
      alert(res.message)
    }
  }

  const handleAdd = async (item) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to add this item?")) {
      const res = await dispatch(addItem(item));
      alert(res.message)
    }
  }

  return (
    <>
      <div className={styles.container}>
        {cart.length === 0 ? (
          <h2>You Cart is Empty</h2>
        ) : (
          <>
            <h2>My Cart</h2>
            <table>
              {cart.map((item, index) => {
                total = total + (item.price * item.qty)
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.image} alt={item.title} />
                    </td>
                    <td>
                      ID {item.id}
                    </td>
                    <td>
                      {item.title}
                    </td>
                    <td>
                      {item.qty} Units X $ {(item.price).toFixed(2)}
                    </td>
                    <td>
                      $ {(item.price * item.qty).toFixed(2)}
                    </td>
                    <td>
                      <Button onClick={() => handleAdd(item)} borderRadius={'100%'} height={'30px'} width={'30px'}>
                        <i className="fa fa-plus me-1"></i>
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => handleDelete(item.id)} borderRadius={'100%'} height={'30px'} width={'30px'} >
                        <i class="fa fa-minus" />
                      </Button>
                    </td>
                  </tr>
                )
              })
              }
            </table>
            <tr className={styles.total}>
              TOTAL $ {total}
            </tr>
            <div className={styles.containerButtonCheckout}>
              <Button width={'200px'} backgroundColor={'#0d6efd'} color={'#fff'} >Checkout</Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart