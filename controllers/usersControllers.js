const fs = require('fs');
const path = require('path');
const bcrypt = require("bcryptjs");


const usersFilePath = path.join(__dirname, '../data/usersDataBase.JSON');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listpro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
	index: (req, res) => {
		res.render('index', {title: 'Inicio', cssFile : 'style', listpro:listpro, toThousand:toThousand})
	},
	login: (req, res)=>{
		res.render('login', {title: 'Login', cssFile : 'style'})  
	},
	signup: (req, res)=>{
		res.render('register', {title: 'Crear Cuenta', cssFile : 'style'})  
	},
	saveUser: (req, res)=>{
		let passEncriptada = bcrypt.hashSync(req.body.password, 10);

		let usuario= {
            id: Date.now(),
            nombre:req.body.nombre,
			apellidos:req.body.apellidos,
			email:req.body.email,
			password:passEncriptada,
			cumpleanios:req.body.cumpleanios,
            tipo_usuario: req.body.tipousuario,
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
        res.redirect('/')
	},
};

module.exports = controller;