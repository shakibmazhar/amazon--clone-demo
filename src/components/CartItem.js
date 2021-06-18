import React from 'react'
import { useGlobalContext } from '../context'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import '../style/CartItem.css'

const CartItem = ({id, title, image, price, rating, quantity, index}) => {
    
    //Global context
    const {dispatch} = useGlobalContext()

    //Function to remove item from cart
    const removeFromCart = () => {
        dispatch({
            type: "REMOVE_ITEM",
            index: index
        })
    }

    //Function to decrease quantity. 
    const decreaseQuantity = () => {
        dispatch({
            type: "DECREASEQUANTITY",
            index: index
        })            
    }

    //Function to add quantity
    const addQuantity = () => {
        dispatch({
            type: "ADDQUANTITY",
            index: index
        })
    }

    return (
        <div className = 'cart_item'>
            <img className = 'cart_img' src={image} alt="" />
            <div className = 'cart_info'>
                <h2 className = 'title'>{title}</h2>
                <small>
                    <strong>${price}</strong>
                </small>
                <p className = 'cart_rating'>
                    {Array(rating).fill().map(() => {
                        return '⭐'
                    })}
                </p>
                <div className="cart_btns">
                    {/* Remove item button */}
                    <button className = 'cart_btn'
                    onClick = {removeFromCart}>
                        Remove from Cart
                    </button>
                    <div className="cartItem_quantity">
                        
                        {/* Decrease item button */}
                        <RemoveIcon className = 'cart_removeBtn'
                        onClick = {decreaseQuantity}/>

                        {/* Quantity indicator */}
                        <p className = 'cart_quantityText'>{quantity}</p>

                        {/* Increase item button */}
                        <AddIcon className = 'cart_addBtn'
                        onClick = {addQuantity}/>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
