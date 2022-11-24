import React, { useRef, useState } from 'react'

import styles from './Checkout.module.css'

const isEmpty = value => value.trim() === ''

const isFive = value => value.trim().length === 5

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    address: true,
    postcode: true
  })

  const name = useRef()
  const address = useRef()
  const postal = useRef()

  const confirmHandler = (event) => {
    event.preventDefault()
    const enteredName = name.current.value
    const enteredAddress = address.current.value
    const enteredPostcode = postal.current.value

    const isEnteredNameValid = isEmpty(enteredName)
    const isEnteredAddressValid = isEmpty(enteredAddress)
    const isPostValid = isFive(enteredPostcode)

    setFormValidity({
      name: enteredName,
      address: enteredAddress,
      postcode: enteredPostcode
    })

    const isFormValid = isEnteredNameValid && isEnteredAddressValid && isPostValid

    if (!isFormValid) {
      return 
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      postcode: enteredPostcode
    })
  }

  const nameControl = `${styles.control} ${formValidity.name} ? '': ${styles.invalid}`
  const addressControl = `${styles.control} ${formValidity.address} ? '': ${styles.invalid}`
  const postcodeControl = `${styles.control} ${formValidity.postcode} ? '': ${styles.invalid}`
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControl}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' ref={name} id='name' />
        {!formValidity.name && <p>Fill name field!</p> }
      </div>
      <div className={addressControl}>
        <label htmlFor='address'>Address</label>
        <input type='text' ref={address} id='address' />
        {!formValidity.address && <p>Fill address field!</p> }
      </div>
      <div className={postcodeControl}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' ref={postal} id='postal' />
        {!formValidity.postcode && <p>Input postcode field!</p> }
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout