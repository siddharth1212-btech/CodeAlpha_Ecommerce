const Order = require("../models/Order.js");

// Place Order
const placeOrder = async (req, res) => {

    try {

        const {
            userName,
            productName,
            price,
            paymentMethod
        } = req.body;

        const order = await Order.create({
            userName,
            productName,
            price,
            paymentMethod
        });

        res.status(201).json({
            message: "Order Placed Successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    placeOrder
};