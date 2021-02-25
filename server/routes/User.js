const express = require('express');
const { createUser, getUser, updateUser, deleteUser, loginUser } = require('../controller/User');
const { authUser } = require('./../middlerware/authMiddleware')

const router = express.Router();
router.route('/login').post(loginUser)
router.route('/signin').post(createUser)
router.route('/').get(authUser, getUser)
    .put(authUser, updateUser,).delete(authUser, deleteUser)

module.exports = router;