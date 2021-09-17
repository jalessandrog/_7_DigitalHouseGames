const fs = require('fs');
const path = require('path');
const db=require('../database/models');


function adminMiddleware (req, res, next) {
    const adminPrivilege = db.Usuario.findByPk(res.locals.logueado.email)
    
    // if(userCookie){
    //     req.session.usuarioLogueado = userCookie;
    // }

    // if(req.session.usuarioLogueado){
    //     res.locals.logueado = true;
    //     res.locals.logueado = req.session.usuarioLogueado; 
    // }

    next();
} 

module.exports = adminMiddleware;