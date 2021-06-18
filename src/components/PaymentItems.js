import React from 'react'
import '../style/PaymentItems.css'

const PaymentItems = ({id, title, image, price, rating, quantity}) => {

    return (
        <div className = 'paymentItems'>
            <img className = "item_img" src={image} alt="product_image" />
            <div className="items_info">
                <div className="items_infoBasic">
                    <h4>{title}</h4>
                    <small>
                        <strong className = 'payment_itemPrice'>${price}</strong>
                    </small>
                    <p>{Array(rating).fill().map(() => {
                        return '⭐'
                    })}</p>
                </div>
                <div className = 'items_infoQnt'>
                    <p>x{quantity}</p>
                </div>
            </div>
        </div>
    )
}

export default PaymentItems
