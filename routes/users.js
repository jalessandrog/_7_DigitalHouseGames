// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersControllers');

router.get('/', usersController.index); 
router.get('/login', usersController.login);
router.get('/register', usersController.signup);


module.exports = router;
