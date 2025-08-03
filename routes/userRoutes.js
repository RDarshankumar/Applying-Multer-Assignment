const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../Controller/userController');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload, registerUser);

router.post('/login', loginUser);

module.exports = router;







