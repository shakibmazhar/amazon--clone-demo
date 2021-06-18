const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { key } = require("./stripeKey");
const stripe = require("stripe")(key);

// API

// - API CONFIG
const app = express();

// - MIDDLEWARES
app.use(cors({ origin: true }));
app.use(express.json());

// - API ROUTE

// Default route
app.get("/", (request, response) =>
    response.status(200).send("Server Running")
);

// Post route for payment
app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    //Return client secret on success
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// - LISTEN COMMAND
exports.api = functions.https.onRequest(app);
