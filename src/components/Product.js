import React from 'react'
import { useGlobalContext } from '../context'
import '../style/Product.css'

const Product = ({id, title, image, price, rating}) => {

    //Global context
    const {cart, dispatch} = useGlobalContext()

    //Function to add element to cart
    const addToCart = (id, title, image, price, rating) => {
   
        dispatch({
            type: "ADDTOCART",
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
            quantity: 1
        })        
         
                 
    }

    return (
        <section className = 'product'>
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(rating).fill().map(() => {
                        return <p>⭐</p>
                    })}
                </div>
            </div>
            <img src = {image}
            alt="product" />
            <button className = 'product_btn'
            onClick = {() => addToCart(id, title, image, price, rating)}>
                Add to Cart
            </button>
        </section>
    )
}

export default Product
