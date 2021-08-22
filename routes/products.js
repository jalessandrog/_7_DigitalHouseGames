// ************ Require's ************
const express = require('express');
const upload=require('../config/productsMulter');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 
router.get('/basket', productsController.basket);
router.get('/addproduct', productsController.create);
router.post('/addproduct',upload.single('imagenPrincipal'),productsController.guardar)
router.get('/edit/:id', authMiddleware, productsController.edit);
router.put('/edit/:id',upload.single('imagenPrincipal'), productsController.actualizar)
router.delete('/delete/:id',upload.single('imagenPrincipal'), productsController.eliminar)
router.get('/all',productsController.todos)
router.get('/Nintendo',productsController.ni)
router.get('/PS',productsController.ps)
router.get('/Xbox',productsController.xb)


module.exports = router;