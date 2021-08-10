// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload=require('../config/multer');

// ************ Controller Require ************
const usersController = require('../controllers/usersControllers');

router.get('/', usersController.index); 
router.get('/login', usersController.login);

router.get('/register', usersController.signup);
router.post('/register',upload.single('avatar'), usersController.saveUser);


module.exports = router;
