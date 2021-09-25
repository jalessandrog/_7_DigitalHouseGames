// const fs = require('fs');
// const path = require('path');
const db=require('../database/models');

// const usersFilePath = path.join(__dirname, '../data/usersDataBase.JSON');
// const usersList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function recordarmeMiddleware(req, res, next){

    if(req.cookies.recordarme != undefined && req.session.usuarioLogueado == undefined){

        let cookieUser = req.cookies.recordarme;
        // const user = usersList.find(correo => correo.email === cookieUser);
        const user = db.Usuario.findOne(correo => correo.email === cookieUser)

        req.session.usuarioLogueado = user;
    }
    next();
}

module.exports = recordarmeMiddleware;