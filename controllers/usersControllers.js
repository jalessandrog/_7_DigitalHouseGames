const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");
const db=require('../database/models');
// const { debugPort } = require('process');


const usersFilePath = path.join(__dirname, '../data/usersDataBase.JSON');
const usersList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listpro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const string= n=>n.toString()

const controller = {
	index: (req, res) => {
		res.render('index', {title: 'Inicio', cssFile : 'style', listpro:listpro, toThousand:toThousand, userlogin : ''})
	},
	login: (req, res)=>{
		res.render('login', {title: 'Login', cssFile : 'style', usersList:usersList})  
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
					.then(function(a)
                	{res.redirect('/login')})
				}
			}else{
				res.send('Falta adjuntar imagen, intentalo de nuevo')
			}
		}else{
			res.render('register', {title: 'Crear Cuenta', cssFile : 'style', errors: errors.mapped(), old : req.body });
		}

		// let errors = validationResult(req);
	
		// if(errors.isEmpty()){
		// 	let usuario= {
		// 		id: Date.now(),
		// 		nombre:req.body.nombre,
		// 		apellidos:req.body.apellidos,
		// 		email:req.body.email,
		// 		password:bcrypt.hashSync(req.body.password, 10),
		// 		cumpleanios:req.body.cumpleanios,
		// 		rolUsuario: req.body.rolUsuario,
		// 		avatar:req.file.filename
		// 	}
		// 	let usersfile=fs.readFileSync(usersFilePath,{encoding:'utf-8'})
		// 	let usuarios;
		// 	if (usersfile==''){
		// 		usuarios=[]
		// 	}else{
		// 		usuarios=JSON.parse(usersfile)
		// 	}
		// 	usuarios.push(usuario)
	
		// 	usuariosJSON= JSON.stringify(usuarios, null, 2)
	
		// 	fs.writeFileSync(usersFilePath,usuariosJSON)
		// 	res.redirect('/login')
		// }else{
		// 	res.render('register', {title: 'Crear Cuenta', cssFile : 'style', errors: errors.mapped(), old : req.body });
		// }
	},
	processLogin: (req, res) =>{
		let errors = validationResult(req);

		if(errors.isEmpty()){

			let userToLogin = db.Usuario.findOne({where: {email: req.body.email}})
			
			.then(function(user){
				if(userToLogin){

					let isOkThePassword = bcrypt.compareSync(req.body.password, user.password)
					console.log(isOkThePassword)
	
					if(isOkThePassword){
						delete userToLogin.user;
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
					res.render('login', {title: 'Login', cssFile : 'style'})  
				}
			})
		}else{
			res.render('login', {title: 'Login', cssFile : 'style', errors: errors.mapped(), old : req.body });
		}


		// let errors = validationResult(req);

		// if(errors.isEmpty()){
		// 	let userEmail = req.body.email;
		// 	const userToLogin = usersList.find(correo => correo.email === userEmail)

			// if(userToLogin){

			// 	let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
			// 	console.log(isOkThePassword)

			// 	if(isOkThePassword){
			// 		req.session.usuarioLogueado = userToLogin;

		// 			if(req.body.remember != undefined){
		// 				res.cookie('recordarme', userToLogin.email, { maxAge: 60000*10 })
		// 			}

		// 			res.redirect('/')
		// 		}else{
		// 			return res.render('login', {title: 'Login', cssFile : 'style',
		// 				errors: {
		// 					password: {
		// 						msg: 'Contraseña Incorrecta'
		// 					}
		// 				}
		// 			})
		// 		}

		// 	}else{
		// 		res.render('login', {title: 'Login', cssFile : 'style'})  
		// 	}

		// }else{
		// 	res.render('login', {title: 'Login', cssFile : 'style', errors: errors.mapped(), old : req.body });
		// }
	},
	profile: (req, res) =>{
		let allUsers= db.Usuario.findAll()
		let userspecific= db.Usuario.findByPk(parseInt(req.params.id,10))
		Promise.all([allUsers,userspecific])
			.then(function([todosresultados,user]){
				res.render('profile', {title: 'Perfil', cssFile : 'style', usersList2:user, usersList:todosresultados});
			})
		// let id= parseInt(req.params.id,10)
        // const user = usersList.find(p => p.id === id)
		// res.render('profile', {title: 'Perfil', cssFile : 'style', user:user, usersList:usersList});
	},
	edit:(req, res) =>{
		db.Usuario.findByPk(parseInt(req.params.id,10),{
			include:[{association:'categoriau'}]
		})
		.then(function(resuser){
			res.render('edit-profile', {title: 'Perfil', cssFile : 'style', usersList3:resuser, string:string})
		})

		// let id= parseInt(req.params.id,10)
        // const user = usersList.find(p => p.id === id)
		// res.render('edit-profile', {title: 'Perfil', cssFile : 'style', user:user, usersList:usersList});
	},
	actualizar: (req, res) =>{

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
					where: {
						idUsuario: parseInt(req.params.id,10)
					}
				});
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
			});
		}
		res.redirect('/profile/'+ parseInt(req.params.id,10))
		

		// if(req.file){
        //     if(req.file.filename){
        //         let id = parseInt(req.params.id,10)
        //         let users = usersList.findIndex(user=>user.id==id)
        //         var imagenbor = "public/images/users"+(usersList[users].avatar)
        //         if(fs.existsSync(imagenbor)){
        //             fs.unlinkSync(imagenbor)
        //         }
        //         usersList.map(function(user){
        //             if(user.id == id){
        //                 user.nombre= req.body.nombre,
        //                 user.apellidos = req.body.apellidos,
        //                 user.email= req.body.email,
        //                 user.password= bcrypt.hashSync(req.body.password, 10),
        //                 user.cumpleanios=req.body.cumpleanios,
        //                 user.rolUsuario=req.body.rolUsuario,
        //                 user.avatar=req.file.filename
        //             }
        //             return user
        //         })
        //     }
        // }else{
        //     let id= parseInt(req.params.id,10)
        //     usersList.map(function(user){
        //         if(user.id == id){
		// 			user.nombre= req.body.nombre,
		// 			user.apellidos = req.body.apellidos,
		// 			user.email= req.body.email,
		// 			user.password= bcrypt.hashSync(req.body.password, 10),
		// 			user.cumpleanios=req.body.cumpleanios,
		// 			user.rolUsuario=req.body.rolUsuario
        //         }
        //         return user
        //     })   
        // }
        // usuariosJSON= JSON.stringify(usersList, null, 2)
	
		// fs.writeFileSync(usersFilePath,usuariosJSON)
        // res.redirect('/all')
	},
	all: (req, res) =>{
		db.Usuario.findAll()
			.then(function(usuarios){
				res.render('users', {title: 'Lista Usuarios', cssFile : 'style', usersList:usuarios})
			})
		// res.render('users', {title: 'Lista Usuarios', cssFile : 'style', usersList:usersList})
	},
	eliminar: (req, res) =>{

		db.Usuario.destroy({
			where:{
				idUsuario: parseInt(req.params.id,10)
			}
		})

		res.redirect('/all')	

		// let id= parseInt(req.params.id,10)
        // let users= usersList.findIndex(user=>user.id==id)
        // console.log(users)
        // var imagenbor = "public/images/users"+(usersList[users].avatar)
		// if(fs.existsSync(imagenbor)){
		// 	fs.unlinkSync(imagenbor)
		// }
		// res.redirect('/all')
		// usersList.splice(users,1)

		// usuariosJSON= JSON.stringify(usersList, null, 2)
	
		// fs.writeFileSync(usersFilePath,usuariosJSON)
        // res.redirect('/all')	
	}
};

module.exports = controller;

