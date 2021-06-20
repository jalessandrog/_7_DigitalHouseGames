const express = require('express')
const app = express();

app.use('/static', express.static('public'));


app.listen(3000, () =>{
    console.log('Servidor funcionando en el puerto 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})