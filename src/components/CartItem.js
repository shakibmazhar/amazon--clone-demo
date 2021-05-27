import React from 'react'
import { useGlobalContext } from '../context'
import '../style/CartItem.css'

const CartItem = ({id, title, image, price, rating}) => {
    
    const {dispatch} = useGlobalContext()

    const removeFromCart = (id) => {
        dispatch({
            type: 'REMOVE_ITEM',
            id: id
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
                <button className = 'cart_btn'
                onClick = {() => {
                    removeFromCart(id)
                }}>
                    Remove from Cart
                </button>
            </div>
        </div>
    )
}

export default CartItem
