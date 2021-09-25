const fs = require('fs');
const path = require('path');
const db=require('../database/models');

function usuarioLogueadoMiddleware (req, res, next) {
    res.locals.logueado = false; 
    
    db.Usuario.findOne({where: {email: req.cookies.recordarme}})
    
    .then(function(user) {
        if(user) {req.session.userLogged = user;}
    });
    
    if(req.session.usuarioLogueado){
        res.locals.logueado = true;
        res.locals.logueado = req.session.usuarioLogueado; 
    }

    next();
} 

module.exports = usuarioLogueadoMiddleware;
