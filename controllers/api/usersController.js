const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const db=require('../../database/models');

const Usuario = db.Usuario;

const controller = {
    'all': (req, res) => {
        // db.Usuario.findAll({

        // })
        // .then(function(usuarios){
            
        // }).catch(error => console.error(error));
        Usuario.findAll()
        .then(function(usuarios){
            Object.values(usuarios).forEach(function (usuario) {
                usuario.dataValues.detail = `api/usuarios/${usuario.idUsuario}`;
            });
            return res.json({
                meta: {
                    status: 200,
                    count: Object.values(usuarios).length,
                    url: 'api/usuarios/'
                },
                data: usuarios
            })
        }).catch(error => console.error(error));
    },
    'profile': (req, res) => {
        let allUsers= Usuario.findAll()
		let userspecific= Usuario.findByPk(parseInt(req.params.id,10))
		Promise.all([allUsers,userspecific])
			.then(function([todosresultados,user]){
				res.json({
                    id: user.idUsuario, 
                    nombre:user.nombre,
                    apellidos:user.apellidos,
                    email:user.email,
                    password:bcrypt.hashSync(user.password, 10),
                    cumpleanios:user.cumpleanios,
                    idCategoriaU: [user.categoriau],
                    avatar:"/images/users" + user.avatar
                })
			})
            .catch(error => console.error(error));
    } 
}

module.exports = controller;