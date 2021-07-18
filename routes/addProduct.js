var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addProduct',{
    title: 'Añadir producto',
    cssFile: 'styles_addProduct'
  });
});

module.exports = router;