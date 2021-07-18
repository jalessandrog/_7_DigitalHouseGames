var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('productDetail', {
    title: 'Detalle de producto',
    cssFile: 'styles_productDetail'
  });
});

module.exports = router;