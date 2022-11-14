import React, { useContext } from 'react'
import CartContext from '../../../store/cart-context'

import styles from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MealItem = props => {
  const price = `$ ${props.price}`

  const cartCtx = useContext(CartContext)

  const addToChartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.title,
      amount: amount,
      price: props.price
    })
  }

  return (
    <li className={styles.meal}>
        <div>
            <h3>{props.title}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
          <MealItemForm onAddToChart={addToChartHandler} id={props.id} />
        </div>
    </li>
  )
}

export default MealItem