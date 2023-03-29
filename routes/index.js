const express = require('express');
const controller = require('../controllers');
const protect = require('../controllers/auth');

const router = express.Router();

router.post('/register', controller.createUser);
router.post('/login', controller.login);

module.exports = router;