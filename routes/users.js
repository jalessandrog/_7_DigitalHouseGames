// ************ Require's ************
const express = require('express');
const router = express.Router();
const upload=require('../config/usersMulter');
const db=require('../database/models');
const path = require('path')
const { body, matchedData, check } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

// ************ Controller Require ************
const usersController = require('../controllers/usersControllers');
const { compare } = require('bcryptjs');

// Validaciones
const validateCreateForm = [
    body('nombre').notEmpty().withMessage('Debes ingresar el nombre'),
    body('apellidos').notEmpty().withMessage('Debes completar el campo de apellido'),
    body('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .exists()
        .isEmail().withMessage('Debes completar un email válido').bail()
        .custom(userEmail=> {
            return new Promise((resolve, reject) => {
                db.Usuario.findOne({ where: { email: userEmail } })
                .then(emailExist => {
                    if(emailExist !== null){
                        reject(new Error('El usuario ya existe'))
                    }else{
                        resolve(true)
                    }
                })
            })
        }),
    body('cumpleanios').isDate().withMessage('Debes ingresar una fecha de nacimiento válida'),
    body('password')
        .notEmpty().withMessage('Debes escribir una contraseña').bail()
        .isLength({min: 8, max: 32}).withMessage('Debes ingresar una contraseña con al menos 8 caracteres').bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,"i").withMessage('La contraseña no es lo suficiente fuerte, debe contener al menos un numero, una letra mayuscula, una letra minuscula, un caracter fuerte y un minimo de 8 caracteres'),
    // body('confirmPassword')
    //     .custom((value, {req}) => {
    //         if(value !== req.body.password){
    //             throw new Error('Las contraseñas deben coincidir')
    //         }else{
    //             return true;
    //         }
    //     }),
    body('avatar')
    .custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions=['.jpg','.png','.jpeg','.gif']
        if(file){
            let fileExtension = path.extname(file.filename)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true
    })
];

const validateUserLogin = [
    body('email').notEmpty().withMessage('Debes completar el email'),
    body('password').notEmpty().withMessage('Debes escribir una contraseña'),
];

const validateEditForm = [
    body('nombre').notEmpty().withMessage('Debes ingresar el nombre'),
    body('apellidos').notEmpty().withMessage('Debes completar el campo de apellido'),
    body('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes completar un email válido'),
    body('cumpleanios').isDate().withMessage('Debes ingresar una fecha de nacimiento válida'),
    body('password')
        .notEmpty().withMessage('Debes escribir una contraseña').bail()
        .isLength({min: 8, max: 32}).withMessage('Debes ingresar una contraseña con al menos 8 caracteres').bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,"i").withMessage('La contraseña no es lo suficiente fuerte, debe contener al menos un numero, una letra mayuscula, una letra minuscula, un caracter fuerte y un minimo de 8 caracteres'),
    // body('confirmPassword')
    //     .custom((value, {req}) => {
    //         if(value != req.body.password){
    //             throw new Error('Las contraseñas deben coincidir')
    //         }else{
    //             return true;
    //         }
    //     }), 
    body('avatar')
    .custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions=['.jpg','.png','.jpeg','.gif']
        if(file){
            let fileExtension = path.extname(file.filename)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true
    })
];


router.get('/', usersController.index); 
router.get('/all', authMiddleware, adminMiddleware, usersController.all);

router.get('/login', usersController.login);
router.post('/login', validateUserLogin, usersController.processLogin);

router.get('/logout', usersController.logout);

router.get('/register', guestMiddleware, usersController.signup);
router.post('/register', guestMiddleware, upload.single('avatar'), validateCreateForm, usersController.saveUser);

router.get('/profile/:id/', authMiddleware, usersController.profile);
router.get('/edit/:id', authMiddleware, adminMiddleware,usersController.edit);
router.put('/edit/:id',adminMiddleware, upload.single('avatar'), validateEditForm, usersController.actualizar)

router.post('/delete/:id',adminMiddleware, upload.single('avatar'), usersController.eliminar)

module.exports = router;
