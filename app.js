const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const methodOverride=require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser'); 
const recordarmeMiddleware = require('./middlewares/cookieMiddleware');
const usuarioLogueadoMiddleware = require('./middlewares/usuarioLogueado');


// ************ Template Engine ************
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Secreto!!!',
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());
app.use(recordarmeMiddleware);
app.use(usuarioLogueadoMiddleware);


const usersRouter = require('./routes/users'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products
const { cookie } = require('express-validator');


app.use('/', usersRouter);
app.use('/products', productsRouter);


app.use((req, res, next)=>{
    res.status(404);
    res.send('ERROR 404')
});

app.listen(3000, () =>{
    console.log('Servidor funcionando en el puerto 3000')
})

module.exports = app;