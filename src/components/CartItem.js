import React from 'react'
import { useGlobalContext } from '../context'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import '../style/CartItem.css'

const CartItem = ({id, title, image, price, rating, quantity, index}) => {
    
    //Global context
    const {dispatch} = useGlobalContext()

    //Function to remove item from cart
    const removeFromCart = (index) => {
        dispatch({
            type: "REMOVE_ITEM",
            index: index
        })
    }

    //Function to decrease quantity. 
    const decreaseQuantity = (index) => {
        dispatch({
            type: "DECREASEQUANTITY",
            index: index
        })            
    }

    //Function to add quantity
    const addQuantity = (index) => {
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
                    <button className = 'cart_btn'
                    onClick = {() => {
                        removeFromCart(index)
                    }}>
                        Remove from Cart
                    </button>
                    <div className="cartItem_quantity">

                        <RemoveIcon className = 'cart_removeBtn'
                        onClick = {() => {
                        decreaseQuantity(index)}}/>
                        
                        <p className = 'cart_quantityText'>{quantity}</p>
                        
                        <AddIcon className = 'cart_addBtn'
                        onClick = {() => {
                        addQuantity(index)}}/>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
