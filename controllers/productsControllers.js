const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const controller = {
    index: (req, res) => {

    },
    detail: (req, res) => {
        res.render('detail', {title: 'Crear Cuenta', cssFile : 'style'})
    },
    basket: (req, res) =>{
         res.render('shopping-cart',{ title: 'Carrito de Compras', cssFile: 'styles_productCar'})
    },
    create: (req, res) => {
        res.render('product-create-form',{ title: 'Añadir producto', cssFile: 'styles_addProduct'})
    }
};

module.exports = controller;