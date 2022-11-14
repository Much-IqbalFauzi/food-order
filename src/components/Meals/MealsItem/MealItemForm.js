import React, { useRef, useState } from 'react'
import Input from '../../UI/Input';

import styles from './MealItemForm.module.css'

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInput = useRef()

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInput.current.value
    const enteredAmountNumber = +enteredAmount

    if (
      enteredAmount.trim().length === 0 || 
      enteredAmountNumber < 1 || 
      enteredAmountNumber > 5) {
        setAmountIsValid(false)
        return
    }

    props.onAddToChart(enteredAmountNumber)
  }


  return (
    <form className={styles.form} onSubmit={submitHandler}>
        <Input 
          ref={amountInput}
          input={{
            id: 'amount_'+props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
          }} 
          label='Amount' />
        <button className=''>+ Add</button>
        {!amountIsValid && <p>Please entered a valid amount (1-5).</p>}
    </form>
  )
}

export default MealItemForm