import React from 'react'
import { useGlobalContext } from '../context'
import '../style/Checkout.css'
import CartItem from './CartItem'
import Subtotal from './Subtotal'

const Checkout = () => {
    //Global context. Fetching cart from app state.
    const {cart} = useGlobalContext()    

    return (
        <section className = 'checkout'>
            <div className="checkout_left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img16/CCMP/newstorefront/YACC-desktop-nonprime-banner3.png" 
                alt="" className="checkout_ad" />

                <h2 className = "checkout_title">
                    Your Cart
                </h2>

                <div className="cart">
                    {cart.length>0? cart.map((item, index) => (
                        <CartItem 
                        key = {index}
                        index = {index}
                        id = {item.id}
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        rating = {item.rating}
                        quantity = {item.quantity} />
                    )) : <h2 className = 'cart_emptyText'>
                            Your cart is empty
                        </h2>
                    }
                </div>
            </div>
            <div className="checkout_right">
                <Subtotal />
            </div>
        </section>
    )
}

export default Checkout
