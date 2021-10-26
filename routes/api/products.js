// ************ Require's ************
const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const path = require('path')



// ************ Controller Require ************
const productsController = require('../../controllers/api/productsControllers');



/*** GET ALL PRODUCTS ***/ 
router.get('/products/', productsController.index); 


/*** GET ONE PRODUCT ***/ 
router.get('/products/:id', productsController.detail); 




module.exports = router;