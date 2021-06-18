import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { db } from "../firebase";
import "../style/Orders.css";
import Order from "./Order";

const Orders = () => {
    const { user } = useGlobalContext();

    const [orders, setOrders] = useState();

    useEffect(() => {
        // Getting user's orders from database
        if (user) {
            db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .orderBy("created", "desc")
                .onSnapshot((snapshot) =>
                    setOrders(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    )
                );
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className="orders">
            <h1>Your Order History</h1>

            <div className="orders_order">
                {orders?.map((order) => {
                    return <Order order={order} />;
                })}
            </div>
        </div>
    );
};

export default Orders;
