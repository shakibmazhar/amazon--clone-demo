import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import "../style/Payment.css";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import PaymentItems from "./PaymentItems";
import axios from "../axios";
import { db } from "../firebase";

const Payment = () => {
    //Global context
    const { user, cart, totalPrice, dispatch } = useGlobalContext();

    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState();
    const [succeeded, setSucceeded] = useState(false);

    const [clientSecret, setClientSecret] = useState(true);

    //runs whenever the cart changes
    useEffect(() => {
        //Client secret that allows to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                //Stripe expects total payment to be in the currency's sub units (cents)
                url: `/payments/create?total=${totalPrice * 100}`,
            });
            setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
    }, [totalPrice]);

    //console.log("Client Secret", clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        // Sending payment through stripe
        const payload = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            })
            .then(({ paymentIntent }) => {
                // setting order info in db
                db.collection("users")
                    .doc(user?.uid)
                    .collection("orders")
                    .doc(paymentIntent.id)
                    .set({
                        cart: cart,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created,
                    });

                // paymentIntent is payment confirmation
                setSucceeded(true);
                setError(null);
                setProcessing(false);

                // Clearing the cart after payment is successful
                dispatch({
                    type: "EMPTY_CART",
                });

                // Prevents coming back to payment page after payment is successful
                history.replace("/orders");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        // If event is empty setDisabled to true
        setDisabled(e.empty);
        // If there is an error, setError to error, otherwise setError to empty
        setError(e.error ? e.error.message : "");
    };

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout (
                    <Link to="/checkout" className="payment_containerLink">
                        {cart?.length} items
                    </Link>
                    )
                </h1>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>230 Unknown Lane</p>
                        <p>Brooklyn, NY</p>
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {cart.map((item, index) => (
                            <PaymentItems
                                key={index}
                                index={index}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                quantity={item.quantity}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3 className="payment_total">
                                                Order Total: {value}
                                            </h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={totalPrice}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button
                                    disabled={
                                        processing || disabled || succeeded
                                    }
                                >
                                    <span>
                                        {processing ? "Processing" : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {/* Show error if there is any */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
