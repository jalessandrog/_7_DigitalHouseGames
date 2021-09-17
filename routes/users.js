// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload=require('../config/usersMulter');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

// ************ Controller Require ************
const usersController = require('../controllers/usersControllers');

// Validaciones
const validateCreateForm = [
    body('nombre').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('apellidos').notEmpty().withMessage('Debes completar el campo de apellido'),
    body('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes completar un email válido'),
    body('cumpleanios').isDate().withMessage('Debes ingresar una fecha de nacimiento válida'),
    body('password')
        .notEmpty().withMessage('Debes escribir una contraseña').bail()
        .isLength({min: 8, max: 32}).withMessage('Debes ingresar una contraseña con al menos 8 caracteres'),
];

const validateUserLogin = [
    body('email').notEmpty().withMessage('Debes completar el email'),
];


router.get('/', usersController.index); 
router.get('/all', authMiddleware, adminMiddleware, usersController.all);

router.get('/login', usersController.login);
router.post('/login', validateUserLogin, usersController.processLogin);

router.get('/logout', usersController.logout);

router.get('/register', guestMiddleware, usersController.signup);
router.post('/register', upload.single('avatar'), validateCreateForm, usersController.saveUser);

router.get('/profile/:id/', authMiddleware, usersController.profile);
router.get('/edit/:id', authMiddleware, adminMiddleware,usersController.edit);
router.put('/edit/:id',upload.single('avatar'), usersController.actualizar)

router.post('/delete/:id',adminMiddleware, upload.single('avatar'), usersController.eliminar)

module.exports = router;
