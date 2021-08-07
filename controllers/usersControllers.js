const fs = require('fs');
const path = require('path');

//productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	index: (req, res) => {
		res.render('index', {title: 'Inicio', cssFile : 'style'})
	},
	login: (req, res)=>{
		res.render('login', {title: 'Login', cssFile : 'style'})  
	},
	signup: (req, res)=>{
		res.render('register', {title: 'Crear Cuenta', cssFile : 'style'})  
	}
};

module.exports = controller;