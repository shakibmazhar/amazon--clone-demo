import React, {useEffect} from 'react'
import '../style/Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import {useGlobalContext} from '../context'

const Subtotal = () => {

    const {cart, totalPrice, dispatch} = useGlobalContext()

    let total = 0;

    const calculateTotal = () => {
        cart.map((item) => {
            total = total + item.price   
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

            <button className = 'checkout_btn'>
                Proceed to Checkout
            </button>
       </section>
    )
}

export default Subtotal
