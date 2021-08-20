const fs = require('fs');
const path = require('path');
const methodOverride=require('method-override');
const { body } = require('express-validator');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listpro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const string= n=>n.toString()

const controller = {
    index: (req, res) => {
        res.render('all', {title: 'Detalles del producto', cssFile : 'style', listpro:listpro, toThousand:toThousand})
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
        if(req.file){
            if(req.file.filename){
                let product= {
                    id: Date.now(),
                    nombre:req.body.nombre,
                    rating: parseInt(req.body.rating,10),
                    precio: parseInt(req.body.precio,10),
                    plataforma:req.body.plataforma,
                    consola:req.body.consola,
                    categoria:req.body.categoria,
                    breveDescripcion: req.body.breveDescripcion,
                    informacionAdicional: req.body.informacionAdicional,
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
            }
        }else{
            res.send('Falta adjuntar imagen, intentalo de nuevo')
        }
        
        
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

        if(req.file){
            if(req.file.filename){
                let id= parseInt(req.params.id,10)
                let index= listpro.findIndex(game=>game.id==id)
                var imagenbor= "public/images/"+(listpro[index].imagenPrincipal)
                if(fs.existsSync(imagenbor)){
                    fs.unlinkSync(imagenbor)
                }
                listpro.map(function(game){
                    if(game.id == id){
                        game.nombre= req.body.nombre,
                        game.rating= parseInt(req.body.rating,10),
                        game.precio= parseInt(req.body.precio,10),
                        game.plataforma = req.body.plataforma,
                        game.consola= req.body.consola,
                        game.categoria= req.body.categoria,
                        game.breveDescripcion=req.body.breveDescripcion,
                        game.informacionAdicional=req.body.informacionAdicional,
                        game.imagenPrincipal=req.file.filename

                    }
                    return game
                })

            }
        }else{
             let id= parseInt(req.params.id,10)
             listpro.map(function(game){
                 if(game.id == id){
                   game.nombre= req.body.nombre,
                   game.rating= parseInt(req.body.rating,10),
                   game.precio= parseInt(req.body.precio,10),
                   game.plataforma = req.body.plataforma,
                   game.consola= req.body.consola,
                   game.breveDescripcion=req.body.breveDescripcion,
                   game.informacionAdicional=req.body.informacionAdicional
                   game.categoria= req.body.categoria
                }
                return game
             })
            
        }
        productosJSON= JSON.stringify(listpro, null, 2)

        fs.writeFileSync(productsFilePath,productosJSON)
        res.redirect('/products/all')
    },
    eliminar: (req,res)=>{
        let id= parseInt(req.params.id,10)
        let index= listpro.findIndex(game=>game.id==id)
        console.log(index)
        var imagenbor= "public/images/"+(listpro[index].imagenPrincipal)
            if(fs.existsSync(imagenbor)){
                    fs.unlinkSync(imagenbor)
                }
                res.redirect('/products/all')
        listpro.splice(index,1)
        productosJSON= JSON.stringify(listpro, null, 2)

        fs.writeFileSync(productsFilePath,productosJSON)
        res.redirect('/products/all')
    }     
};

module.exports = controller;