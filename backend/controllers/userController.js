const Order =
    require(
        "../models/Order"
    );const User = require("../models/User.js");

// Register User
const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Login User
const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {

            return res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

        res.json({
            message: "Login Successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};