import React from "react";
import moment from "moment";
import "../style/Order.css";
import PaymentItems from "./PaymentItems";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
    //console.log(order);
    return (
        <div className="order">
            <h2>Order</h2>
            <p>
                {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
            </p>
            <p className="order_id">
                <small>{order.id}</small>
            </p>
            {order.data.cart?.map((item) => {
                return (
                    <PaymentItems
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        quantity={item.quantity}
                    />
                );
            })}
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <h3 className="order_total">Order Total: {value}</h3>
                    </>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    );
};

export default Order;
