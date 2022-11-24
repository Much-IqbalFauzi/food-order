import React, { Fragment, useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'

import styles from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
  const [checkoutState, setChecoutState] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext)
  
  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const submitHandler = async (userData) => {
    setIsSubmit(true)
    const response = await fetch('https://react-swapi-a1040-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItem: cartCtx.items
      })
    })

    setIsSubmit(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const cartItemAddHandler = item => {
      cartCtx.addItem({...item, amount: 1})
  }

  const orderHandler = () => {
    setChecoutState(true)
  }

  
  const dummyCartItems = (
    <ul className={styles['cart-items']}>{
      cartCtx.items.map((item) => {
        return (
          <CartItem 
            key={item.id} 
            name={item.name} 
            price={item.price} 
            amount={item.amount} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)} 
            onAdd={cartItemAddHandler.bind(null, item)} />
        )
      })
    }</ul>)
  
  const modalAction = (
    <div className={styles.actions}>
        <button className={styles['button-alt']} onClick={props.onCloseCart}>Close</button>
        <button className={styles.button} onClick={orderHandler}>Order</button>
    </div>
  )

  const isSubmittingDataModal =  <p>Sending order Data . . . </p>

  const didSubmitDataModal = (
    <Fragment>
      <p>Successfully send data . . . </p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onCloseCart}>Close</button>
    </div>
    </Fragment>
  )

  const modalContent = (
    <Fragment>
      {dummyCartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        { checkoutState && <Checkout onConfirm={submitHandler} onCancel={props.onCloseCart}/>}

        { !checkoutState && modalAction}
    </Fragment>
  )

  return (
    <Modal onClose={props.onCloseCart}>
        { !isSubmit && !didSubmit && modalContent}
        { isSubmit && isSubmittingDataModal}
        { !isSubmit && didSubmit && didSubmitDataModal}
    </Modal>
  )
}

export default Cart