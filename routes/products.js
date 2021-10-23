// ************ Require's ************
const express = require('express');
const upload=require('../config/productsMulter');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const { body } = require('express-validator')
const path = require('path')



// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

// ************ Validations ************
const validateProductCreate = [
    body('nombre')
        .notEmpty().withMessage('Debes poner el nombre del producto').bail()
        .isLength({min:5}).withMessage('Se deben tener por lo menos 5 caracteres'),
    body('breveDescripcion')
        .notEmpty().withMessage('Debes poner una descripción del producto').bail()
        .isLength({min:20}).withMessage('Se deben tener por lo menos 20 caracteres'),
    body('plataforma').notEmpty().withMessage('Debes elegir una plataforma'),
    body('precio').notEmpty().withMessage('Debes poner un precio'),
    body('rating').notEmpty().withMessage('Debes elegir una calificación'),
    body('consola').notEmpty().withMessage('Debes elegir una consola'),
    body('categoria').notEmpty().withMessage('Debes elegir una categoria'),
    body('imagenPrincipal').custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions=['.jpg','.png','.jpeg','.gif']
 
        if(!file){
            throw new Error('Tienes que subir una imagen')
        }else{
            let fileExtension = path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true
    })
]
const validateProductModification = [
    body('nombre')
        .notEmpty().withMessage('Debes poner el nombre del producto').bail()
        .isLength({min:5}).withMessage('Se deben tener por lo menos 5 caracteres'),
    body('breveDescripcion')
        .notEmpty().withMessage('Debes poner una descripción del producto').bail()
        .isLength({min:20}).withMessage('Se deben tener por lo menos 20 caracteres'),
    body('plataforma').notEmpty().withMessage('Debes elegir una plataforma'),
    body('precio').notEmpty().withMessage('Debes poner un precio'),
    body('rating').notEmpty().withMessage('Debes elegir una calificación'),
    body('consola').notEmpty().withMessage('Debes elegir una consola'),
    body('categoria').notEmpty().withMessage('Debes elegir una categoria'),
    body('imagenPrincipal').custom((value, {req})=>{
        let file = req.file;
        let acceptedExtensions=['.jpg','.png','.jpeg','.gif']
 
        if(file){
            let fileExtension = path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true
    })
]
/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 
router.get('/basket', authMiddleware, productsController.basket);
router.get('/addproduct', authMiddleware,adminMiddleware, productsController.create);
router.post('/addproduct', upload.single('imagenPrincipal'), validateProductCreate, productsController.guardar)
router.get('/edit/:id', authMiddleware, adminMiddleware, productsController.edit);
router.put('/edit/:id',upload.single('imagenPrincipal'), validateProductModification,productsController.actualizar)
router.post('/delete/:id',adminMiddleware,upload.single('imagenPrincipal'), productsController.eliminar)
router.get('/all',productsController.todos)
router.get('/Nintendo',productsController.ni)
router.get('/PS',productsController.ps)
router.get('/Xbox',productsController.xb)


module.exports = router;