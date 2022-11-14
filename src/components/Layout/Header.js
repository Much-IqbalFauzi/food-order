import React, { Fragment } from 'react'

import mealsImg from '../../assets/meals.jpg'
import styles from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <Fragment>
        <header className={styles['header']}>
          <h1>React Meals</h1>
          <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={styles['main-image']}>
          <img src={mealsImg} alt='a table full of delicious food!' />
        </div>
    </Fragment>
  )
}

export default Header