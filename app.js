const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const createError = require('http-errors');

// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());


app.listen(3000, () =>{
    console.log('Servidor funcionando en el puerto 3000')
})

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const productDetailRouter = require('./routes/productDetail');
const addProductsRouter = require('./routes/addProduct');
const productCarRouter = require('./routes/productCar');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/productDetail', productDetailRouter);
app.use('/addProduct', addProductsRouter);
app.use('/productCar', productCarRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

module.exports = app;