const db=require('../database/models');

function usuarioLogueadoMiddleware (req, res, next) {
    res.locals.logueado = false; 
    
    db.Usuario.findOne({
        where: {
            email: req.cookies.recordarme  || null //Si aún no se ha logueado el usuario, se envia como NULL
        }
    })
    .then(function(user) {
        if(user) {
            req.session.usuarioLogueado = user;
        }
    })
    .catch(error => console.error(error));
    
    if(req.session.usuarioLogueado){
        res.locals.logueado = true;
        res.locals.user = req.session.usuarioLogueado; 
    }

    next();
} 

module.exports = usuarioLogueadoMiddleware;
