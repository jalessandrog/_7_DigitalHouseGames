const fs = require('fs');
const path = require('path');

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
	}
};

module.exports = controller;