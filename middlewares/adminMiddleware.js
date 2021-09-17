function adminMiddleware (req, res, next) {
    if (req.session.usuarioLogueado.idCategoriaU != 1){
        res.redirect('/')
        console.log("Acceso denegado - requiere permisos de administrador")
    }
    next();
} 

module.exports = adminMiddleware;
