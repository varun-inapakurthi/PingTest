const User = require("../model/User")
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler");
const { use } = require("../routes/User");


exports.createUser = asyncHandler(async (req, res) => {
    try {

        let { name, email, password } = req.body;
        let isExist = await User.findOne({ email })
        if (!isExist) {
            let user = await User.create({ name, email, password });
            user = user.toObject()
            user.token = await jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_SECRET)
            delete user.password;
            res.json(user)
        } else {
            res.status(400)
            throw new Error('Email already exists')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Email already exists')

    }
})
exports.loginUser = asyncHandler(async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user && await user.matchPassword(password)) {
            user = user.toObject()
            user.token = await jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_SECRET)
            delete user.password;
            res.json(user)
        } else {
            res.status(400)
            throw new Error('Invalid credentials')

        }
    } catch (error) {
        res.status(400)
        throw new Error('Invalid credentials')


    }
})
exports.getUser = asyncHandler(async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user._id }).select('-password').populate('urls', '_id url expectedResponseTime createdAt')
        res.json(user)
    } catch (error) {
        res.status(400)
        throw new Error('Error fetching user')


    }
})
exports.updateUser = asyncHandler(async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = req.user
        user.name = name || user.name
        user.email = email || user.email
        user.password = password || user.password
        await user.save()
        delete user.password
        res.json(user)
    } catch (error) {
        res.status(400)
        throw new Error('Error updating user')

    }
})
exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        let { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({
            status: true
        })
    } catch (error) {
        res.status(400)
        throw new Error('Error deleting user')

    }
})