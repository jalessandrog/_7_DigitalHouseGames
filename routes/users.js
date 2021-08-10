// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload=require('../config/usersMulter');
const { body } = require('express-validator');

// ************ Controller Require ************
const usersController = require('../controllers/usersControllers');

// Validaciones
const validacionFormRegistro = [
    body('nombre').notEmpty().withMessage('Debes completar el campo de Nombre'),
    body('apellidos').notEmpty().withMessage('Debes completar el campo de Apellidos'),
    body('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes completar un email válido'),
    body('cumpleanios').isDate().withMessage('Debes ingresar una fecha de nacimiento válida'),
    body('password')
        .notEmpty().withMessage('Debes escribir una contraseña').bail()
        .isLength({min: 8, max: 32}).withMessage('Debes ingresar una contraseña con al menos 8 caracteres'),
];

router.get('/', usersController.index); 

router.get('/login', usersController.login);
router.post('/login', usersController.login);

router.get('/register', usersController.signup);
router.post('/register', validacionFormRegistro, upload.single('avatar'), usersController.saveUser);


module.exports = router;
