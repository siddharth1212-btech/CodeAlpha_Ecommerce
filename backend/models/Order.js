const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        default: "UPI"
    },

    status: {
        type: String,
        default: "Processing"
    }

}, {
    timestamps: true
});

module.exports =
    mongoose.model(
        "Order",
        orderSchema
    );