const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listpro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const string= n=>n.toString()

const controller = {
    index: (req, res) => {

    },
    detail: (req, res) => {
        let id= parseInt(req.params.id,10)
        const complist = listpro.find(p => p.id === id)
        res.render('detail', {title: 'Detalles del producto', cssFile : 'style',listpro2:complist,listpro:listpro, toThousand:toThousand })
    },
    basket: (req, res) =>{
         res.render('shopping-cart',{ title: 'Carrito de Compras', cssFile: 'styles_productCar'})
    },
    create: (req, res) => {
        res.render('product-create-form',{ title: 'Añadir producto', cssFile: 'styles_addProduct'})
    },
    guardar: (req,res)=>{
        let product= {
            id: Date.now(),
            nombre:req.body.nombre,
            rating: parseInt(req.body.rating,10),
            precio: parseInt(req.body.precio,10),
            plataforma:req.body.plataforma,
            consola:req.body.consola,
            categoria:req.body.categoria,
            imagenPrincipal:req.file.filename
        }
        let archivoproductos=fs.readFileSync(productsFilePath,{encoding:'utf-8'})
        let productos;
        if (archivoproductos==''){
             productos=[]
        }else{
             productos=JSON.parse(archivoproductos)
        }
        productos.push(product)

        productosJSON= JSON.stringify(productos, null, 2)

        fs.writeFileSync(productsFilePath,productosJSON)
        res.redirect('/products/all')
    },
    todos:(req, res) => {
        res.render('all', {title: 'Todos los productos', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    ni:(req, res) => {
        res.render('Nintendo', {title: 'Nintendo', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    ps:(req, res) => {
        res.render('PS', {title: 'Playstation', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    xb:(req, res) => {
        res.render('Xbox', {title: 'Xbox', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    edit: (req, res) => {
        let id= parseInt(req.params.id,10)
        const complist = listpro.find(p => p.id === id)
        res.render('edit-form',{ title: 'Editar producto', cssFile: 'styles_addProduct',listpro3:complist, string:string})
    },
    actualizar: (req, res) => {
        res.send('Actualizado')
    }     
};

module.exports = controller;