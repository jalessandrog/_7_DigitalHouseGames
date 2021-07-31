const fs = require('fs');
const path = require('path');

//productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('index', {title: 'Inicio', cssFile : 'styles'})
	},
	login: (req, res)=>{
		res.render('login', {title: 'Login', cssFile : 'styles_login'})  
	},
	signup: (req, res)=>{
		res.render('register', {title: 'Crear Cuenta', cssFile : 'styles_register'})  
	}
};

module.exports = controller;