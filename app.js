const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');

// ************ Template Engine ************
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());

const usersRouter = require('./routes/users'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products

app.use('/', usersRouter);
app.use('/products', productsRouter);


app.listen(3000, () =>{
    console.log('Servidor funcionando en el puerto 3000')
})

module.exports = app;