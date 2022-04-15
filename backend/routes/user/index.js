const express = require('express');
const userController = require('../../controller/user');

const router = express.Router();

router.post('/saveUserInfo', userController.saveUser);
router.post('/getUserInfo', userController.getUser);

module.exports = router;
