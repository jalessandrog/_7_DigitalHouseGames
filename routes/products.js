// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail', productsController.detail); 
router.get('/basket', productsController.basket);
router.get('/addproduct', productsController.create);



module.exports = router;