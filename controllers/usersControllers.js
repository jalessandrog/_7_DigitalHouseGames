const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const db=require('../database/models');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listpro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const string= n=>n.toString()

const controller = {
	index: (req, res) => {
		res.render('index', {title: 'Inicio', cssFile : 'style', listpro:listpro, toThousand:toThousand, userlogin : ''})
	},
	login: (req, res)=>{
		res.render('login', {title: 'Login', cssFile : 'style'})  
	},
	logout: (req, res) => {
		res.clearCookie('recordarme');
		req.session.destroy();
		return res.redirect('/');
	},
	signup: (req, res)=>{
		res.render('register', {title: 'Crear Cuenta', cssFile : 'style'})  
	},
	saveUser: (req, res)=>{
		let errors = validationResult(req);
	
		if(errors.isEmpty()){
			if(req.file){
				if(req.file.filename){
					db.Usuario.create({
						nombre:req.body.nombre,
						apellidos:req.body.apellidos,
						email:req.body.email,
						password:bcrypt.hashSync(req.body.password, 10),
						cumpleanios:req.body.cumpleanios,
						idCategoriaU: parseInt(req.body.categoriau,10),
						avatar:req.file.filename
					})
					.then(function(a){
						res.redirect('/login')
					}).catch(error => console.error(error));
				}
			}else{
				res.send('Falta adjuntar imagen, intentalo de nuevo')
			}
		}else{
			res.render('register', {title: 'Crear Cuenta', cssFile : 'style', errors: errors.mapped(), old : req.body });
		}
	},
	processLogin: (req, res) =>{
		let errors = validationResult(req);

		if(errors.isEmpty()){

			db.Usuario.findOne({
				where: {
					email: req.body.email
				}
			})
			.then(function(user){
				if(user){

					let isOkThePassword = bcrypt.compareSync(req.body.password, user.password)
					console.log(isOkThePassword)
	
					if(isOkThePassword){
						delete user.user;
						req.session.usuarioLogueado = user;

						if(req.body.remember != undefined){
							res.cookie('recordarme', req.body.email, { maxAge: 60000*10 })
						}

						res.redirect('/')
					}else{
						return res.render('login', {title: 'Login', cssFile : 'style',
							errors: {
								password: {
									msg: 'Contraseña Incorrecta'
								}
							}
						})
					}
				}else{
					res.render('login', {title: 'Login', cssFile : 'style',
						errors: {
							email: {
								msg: 'No se encuentra email'
							}
						}
					}) 
				}
			}).catch(error => console.error(error));
		}else{
			res.render('login', {title: 'Login', cssFile : 'style', errors: errors.mapped(), old : req.body });
		}
	},
	profile: (req, res) =>{
		let allUsers= db.Usuario.findAll()
		let userspecific= db.Usuario.findByPk(parseInt(req.params.id,10))
		Promise.all([allUsers,userspecific])
			.then(function([todosresultados,user]){
				res.render('profile', {title: 'Perfil', cssFile : 'style', usersList2:user, usersList:todosresultados});
			}).catch(error => console.error(error));
	},
	edit:(req, res) =>{
		db.Usuario.findByPk(parseInt(req.params.id,10),{
			include:[{association:'categoriau'}]
		})
		.then(function(resuser){
			res.render('edit-profile', {title: 'Perfil', cssFile : 'style', usersList3:resuser, string:string})
		}).catch(error => console.error(error));
	},

	actualizar: (req, res) =>{

		let errors = validationResult(req);
		if(errors.isEmpty()){
			if(req.file){
				if(req.file.filename){
					db.Usuario.update({
						nombre:req.body.nombre,
						apellidos:req.body.apellidos,
						email:req.body.email,
						password:bcrypt.hashSync(req.body.password, 10),
						cumpleanios:req.body.cumpleanios,
						idCategoriaU: parseInt(req.body.categoriau,10),
						avatar:req.file.filename
					},{
						WHERE: {
							idUsuario: parseInt(req.params.id,10)
						}
					}).then(function(result){
						console.log(result)
						res.redirect('/profile/'+ parseInt(req.params.id,10))
					})
					.catch(error => console.error(error));
				}
			}else{
				db.Usuario.update({
					nombre:req.body.nombre,
					apellidos:req.body.apellidos,
					email:req.body.email,
					password:bcrypt.hashSync(req.body.password, 10),
					cumpleanios:req.body.cumpleanios,
					idCategoriaU: parseInt(req.body.categoriau,10),
				},{
					where: {
						idUsuario: parseInt(req.params.id,10)
					}
				}).then(function(result){
					console.log(result)
					res.redirect('/profile/'+ parseInt(req.params.id,10))
				})
				.catch(error => console.error(error));
			}
		}else{
			db.Usuario.findByPk(parseInt(req.params.id,10),{
				include:[{association:'categoriau'}]
			})
			.then(function(resuser){
				res.render('edit-profile', {title: 'Editar perfil', cssFile : 'style', usersList3:resuser, string:string, errors: errors.mapped(), old : req.body });
			}).catch(error => console.error(error));
		}
	},
	all: (req, res) =>{
		db.Usuario.findAll()
			.then(function(usuarios){
				res.render('users', {title: 'Lista Usuarios', cssFile : 'style', usersList:usuarios})
			}).catch(error => console.error(error));
	},
	eliminar: (req, res) =>{
		db.Usuario.destroy({
			where:{
				idUsuario: parseInt(req.params.id,10)
			}
		}).then(function(result){
			console.log(result)
			res.redirect('/all')
		})
		.catch(error => console.error(error));
	}
};

module.exports = controller;

