// ************ Require's ************
const express = require('express');
const upload=require('../config/multer');
const router = express.Router();


// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail', productsController.detail); 
router.get('/basket', productsController.basket);
router.get('/addproduct', productsController.create);
router.post('/addproduct',upload.single('imagenPrincipal'),productsController.guardar)
router.get('/all',productsController.todos)



module.exports = router;