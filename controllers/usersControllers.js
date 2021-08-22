const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const { eliminar } = require('./productsControllers');


const usersFilePath = path.join(__dirname, '../data/usersDataBase.JSON');
const usersList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listpro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	index: (req, res) => {
		res.render('index', {title: 'Inicio', cssFile : 'style', listpro:listpro, toThousand:toThousand, userlogin : ''})
	},
	login: (req, res)=>{
		res.render('login', {title: 'Login', cssFile : 'style'})  
	},
	signup: (req, res)=>{
		res.render('register', {title: 'Crear Cuenta', cssFile : 'style'})  
	},
	saveUser: (req, res)=>{
		let errors = validationResult(req);
	
		if(errors.isEmpty()){
			let usuario= {
				id: Date.now(),
				nombre:req.body.nombre,
				apellidos:req.body.apellidos,
				email:req.body.email,
				password:bcrypt.hashSync(req.body.password, 10),
				cumpleanios:req.body.cumpleanios,
				rolUsuario: req.body.rolUsuario,
				avatar:req.file.filename
			}
			let usersfile=fs.readFileSync(usersFilePath,{encoding:'utf-8'})
			let usuarios;
			if (usersfile==''){
				usuarios=[]
			}else{
				usuarios=JSON.parse(usersfile)
			}
			usuarios.push(usuario)
	
			usuariosJSON= JSON.stringify(usuarios, null, 2)
	
			fs.writeFileSync(usersFilePath,usuariosJSON)
			res.redirect('/login')
		}else{
			res.render('register', {title: 'Crear Cuenta', cssFile : 'style', errors: errors.mapped(), old : req.body });
		}
	},
	processLogin: (req, res) =>{
		let errors = validationResult(req);

		if(errors.isEmpty()){
			let userEmail = req.body.email;
			const userToLogin = usersList.find(correo => correo.email === userEmail)

			if(userToLogin){

				let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
				console.log(isOkThePassword)

				if(isOkThePassword){
					req.session.usuarioLogueado = userToLogin;
					res.render('index', {title: 'Inicio', cssFile : 'style', listpro:listpro, toThousand:toThousand, userlogin : userToLogin })
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
				res.render('login', {title: 'Login', cssFile : 'style'})  
			}

		}else{
			res.render('login', {title: 'Login', cssFile : 'style', errors: errors.mapped(), old : req.body });
		}
	},
	profile: (req, res) =>{
		let user = req.session.usuarioLogueado;
		console.log(user)
		res.render('profile', {title: 'Perfil', cssFile : 'style', user : user});
	},
	edit:(req, res) =>{
		let user = req.session.usuarioLogueado;
		res.render('edit-profile', {title: 'Perfil', cssFile : 'style', user : user});
	},
	actualizar: (req, res) =>{
		let user = req.session.usuarioLogueado;

		res.send('Actualización en curso...')
	}
	// eliminar: (req, res) =>{
		
	// }
};

module.exports = controller;

