import "./style/App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Error from "./components/Error";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useGlobalContext } from "./context";
import Register from "./components/Register";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import key from "./stripe";
import Orders from "./components/Orders";

//Stripe key
const promise = loadStripe(key);

function App() {
    //Global dispatch
    const { dispatch } = useGlobalContext();

    //Listener for user
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            //console.log('The User is ', authUser)

            if (authUser) {
                //The user is logged in / was logged in
                dispatch({
                    type: "SETUSER",
                    user: authUser,
                });
            } else {
                //The user is logged out
                dispatch({
                    type: "SETUSER",
                    user: null,
                });
            }
        });
    }, []);

    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/checkout">
                    <Checkout />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/payment">
                    <Elements stripe={promise}>
                        <Payment />
                    </Elements>
                </Route>
                <Route path="/orders">
                    <Orders />
                </Route>
                <Route path="/*">
                    <Error />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
