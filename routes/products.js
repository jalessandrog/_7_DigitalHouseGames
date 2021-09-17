// ************ Require's ************
const express = require('express');
const upload=require('../config/productsMulter');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 
router.get('/basket', authMiddleware, productsController.basket);
router.get('/addproduct', authMiddleware,adminMiddleware, productsController.create);
router.post('/addproduct',upload.single('imagenPrincipal'),productsController.guardar)
router.get('/edit/:id', authMiddleware, adminMiddleware, productsController.edit);
router.put('/edit/:id',upload.single('imagenPrincipal'), productsController.actualizar)
router.post('/delete/:id',adminMiddleware,upload.single('imagenPrincipal'), productsController.eliminar)
router.get('/all',productsController.todos)
router.get('/Nintendo',productsController.ni)
router.get('/PS',productsController.ps)
router.get('/Xbox',productsController.xb)


module.exports = router;