const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.JSON');
const usersList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function userioLogueadoMiddleware (req, res, next) {
    res.locals.logueado = false; //res.locals son variables que se pueden compartir en todas las vistas indistintamente del controlador

    let cookieEmail = req.cookies.email;
    const userCookie = usersList.find(correo => correo.email === cookieEmail)
    
    if(userCookie){
        req.session.usuarioLogueado = userCookie;
    }

    if(req.session.usuarioLogueado){
        res.locals.logueado = true;
        res.locals.logueado = req.session.usuarioLogueado; 
    }

    next();
} 

module.exports = userioLogueadoMiddleware;