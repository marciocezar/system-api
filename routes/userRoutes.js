const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users',userController.listUsers);

module.exports = router;
