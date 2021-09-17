const fs = require('fs');
const path = require('path');
const db=require('../database/models');

function userioLogueadoMiddleware (req, res, next) {
    res.locals.logueado = false; //res.locals son variables que se pueden compartir en todas las vistas indistintamente del controlador

    let cookieEmail = db.Usuario.findOne({where: {email: req.cookies.recordarme}})
    
    .then(function(user) {
        if(user) {req.session.userLogged = user;}
    });
    
    if(req.session.usuarioLogueado){
        res.locals.logueado = true;
        res.locals.logueado = req.session.usuarioLogueado; 
    }

    next();
} 

module.exports = userioLogueadoMiddleware;
