var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('productCar',{
    title: 'Carrito de Compras',
    cssFile: 'styles_productCar'
  });
});

module.exports = router;