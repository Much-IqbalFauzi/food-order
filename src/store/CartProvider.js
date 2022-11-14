import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (prevState, currentAction) => {
    if (currentAction.type === 'ADD') {
        // const concatItem = prevState.items.concat(currentAction.item)
        const existingItemIdx = prevState.items.findIndex(item => item.id === currentAction.item.id)
        const existingItem = prevState.items[existingItemIdx]

        let updatedItems
        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + currentAction.item.amount
            }
            updatedItems = [ ...prevState.items ]
            updatedItems[existingItemIdx] = updatedItem
        } else {
            updatedItems = prevState.items.concat(currentAction.item)
        }

        const updatedTotalAmount = prevState.totalAmount + (currentAction.item.price * currentAction.item.amount)

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (currentAction.type === 'REMOVE') {
        const existingItemindex = prevState.items.findIndex(item => item.id === currentAction.id)
        const existingItem = prevState.items[existingItemindex]        
        const updatedTotalAmount = prevState.totalAmount - existingItem.price

        let updatedItems
        if (existingItem.amount === 1) {
            updatedItems = prevState.items.filter(item => item.id !== currentAction.id)
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...prevState.items]
            updatedItems[existingItemindex] = updatedItem

        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        } 
    }
    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    }

    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem : addItemHandler,
        removeItem: removeItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider