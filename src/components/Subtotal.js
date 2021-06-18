import React, {useEffect} from 'react'
import '../style/Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import {useGlobalContext} from '../context'
import { useHistory } from 'react-router-dom'

const Subtotal = () => {
    // Global context
    const {cart, totalPrice, dispatch} = useGlobalContext()

    const history = useHistory()

    let total = 0;

    //Function to calculate total price
    const calculateTotal = () => {
        cart.map((item) => {
            total = total + (item.price * item.quantity)  
            return null 
        })
        dispatch({
            type: "TOTALPRICE",
            total: total
        })
    }

    useEffect(() => {
        calculateTotal()
    }, [cart])

    return (
       <section className = 'subtotal'>
           <CurrencyFormat
            renderText = {value => (
                <div>
                    <p>
                        Subtotal ({cart.length} items): <strong>{value}</strong>
                    </p>
                    <small className = 'subtotal_gift'>
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </div>
            )}
            decimalScale = {2}
            value = {totalPrice}
            displayType = {"text"}
            thousandSeparator = {true}
            prefix = {"$"}/>

            <button className = 'checkout_btn'
            onClick = {() => {
                if(totalPrice > 0){
                    history.push('/payment')
                }
            }}>
                Proceed to Checkout
            </button>
       </section>
    )
}

export default Subtotal
