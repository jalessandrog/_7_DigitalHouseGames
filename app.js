const express = require('express')
const app = express();

app.use('/static', express.static('public'));


app.listen(3000, () =>{
    console.log('Servidor funcionando en el puerto 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
})

app.get('/ingresar', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
})

app.get('/registrar', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
})

app.get('/Sekiro', (req, res) => {
    res.sendFile(__dirname + '/views/productDetail.html');
})