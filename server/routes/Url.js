const express = require('express');
const { addUrl, removeUrl, getUrl } = require('../controller/Url');
const { authUser } = require('../middlerware/authMiddleware');
const router = express.Router();

router.route('/:id').delete(authUser, removeUrl).get(authUser, getUrl)
router.route('/').post(authUser, addUrl)
module.exports = router;
