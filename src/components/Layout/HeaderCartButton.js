import React, {useContext, useEffect, useState} from 'react'
import CartIcon from '../Cart/CardIcon'
import styles from  './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'
const HeaderCardButton = props => {
    const [animatedbtn, setAnimatedBtn] = useState(false)
    const cartCtx = useContext(CartContext)

    const numberCartItems = cartCtx.items.reduce((current, item ) => {
        return current + item.amount
    }, 0)
    const {items} = cartCtx
    const btnClass = `${styles.button} ${ animatedbtn? styles.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return 
        }
        setAnimatedBtn(true)
        const timer = setTimeout(() => {
            setAnimatedBtn(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={styles['icon']}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles['badge']}>{numberCartItems}</span>
        </button>
    )
}

export default HeaderCardButton