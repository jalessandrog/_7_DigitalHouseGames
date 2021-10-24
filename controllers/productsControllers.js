const fs = require('fs');
const path = require('path');
const methodOverride=require('method-override');
const { body } = require('express-validator');
let db=require('../database/models');
const { debugPort, send } = require('process');
const { validationResult } = require('express-validator')


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listpro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const string= n=>n.toString()

const controller = {
    index: (req, res) => {
        db.Producto.findAll()
            .then(function(productos){
                res.render('all', {title: 'Detalles del producto', cssFile : 'style', listpro:productos, toThousand:toThousand})
            })
        // res.render('all', {title: 'Detalles del producto', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    
    detail: (req, res) => {
        let allproducts=db.Producto.findAll()
        let productspecific=db.Producto.findByPk(parseInt(req.params.id,10))
        Promise.all([allproducts,productspecific])
            .then(function([resultall,prod]){
                res.render('detail', {title: 'Detalles del producto', cssFile : 'style',listpro2:prod,listpro:resultall, toThousand:toThousand })
            })

            
//        let id= parseInt(req.params.id,10)
//        const complist = listpro.find(p => p.id === id)
//        res.render('detail', {title: 'Detalles del producto', cssFile : 'style',listpro2:complist,listpro:listpro, toThousand:toThousand })
    },
    basket: (req, res) =>{
         res.render('shopping-cart',{ title: 'Carrito de Compras', cssFile: 'styles_productCar'})
    },
    create: (req, res) => {
         res.render('product-create-form',{ title: 'Añadir producto', cssFile: 'style'})
    },
    guardar: (req,res)=>{
        let errors = validationResult(req);
        

        if(errors.isEmpty()){
            if(req.file){
                if(req.file.filename){
                    db.Producto.create({
                        nombre:req.body.nombre,
                        rating: parseInt(req.body.rating,10),
                        precio: parseInt(req.body.precio,10),
                        breveDescripcion: req.body.breveDescripcion,
                        informacionAdicional: req.body.informacionAdicional,
                        imagenPrincipal:req.file.filename,
                        idPlataforma:parseInt(req.body.plataforma,10),
                        idConsola:parseInt(req.body.consola,10),
                        idCategoria:parseInt(req.body.categoria,10)
                    })
                    .then(function(a)
                    {res.redirect('/products/all')})
                }
            }else{
                res.send('Falta adjuntar imagen, intentalo de nuevo')
            }
        }else{
            return res.render('product-create-form',{ title: 'Añadir producto', cssFile: 'style', errors: errors.mapped(), old: req.body})
        }


//        if(req.file){
//            if(req.file.filename){
//                let product= {
//                    id: Date.now(),
//                    nombre:req.body.nombre,
//                    rating: parseInt(req.body.rating,10),
//                    precio: parseInt(req.body.precio,10),
//                    plataforma:req.body.plataforma,
//                    consola:req.body.consola,
//                    categoria:req.body.categoria,
//                    breveDescripcion: req.body.breveDescripcion,
//                    informacionAdicional: req.body.informacionAdicional,
//                    imagenPrincipal:req.file.filename
//                }
//                let archivoproductos=fs.readFileSync(productsFilePath,{encoding:'utf-8'})
//        let productos;
//        if (archivoproductos==''){
//             productos=[]
//        }else{
//             productos=JSON.parse(archivoproductos)
//        }
//        productos.push(product)
//
//        productosJSON= JSON.stringify(productos, null, 2)
//
//        fs.writeFileSync(productsFilePath,productosJSON)
//        res.redirect('/products/all')
//            }
//        }else{
//            res.send('Falta adjuntar imagen, intentalo de nuevo')
//        }
        
        
    },
    todos:(req, res) => {
        db.Producto.findAll()
            .then(function(productos){
                res.render('all', {title: 'Todos los productos', cssFile : 'style', listpro:productos, toThousand:toThousand})
            })
        //res.render('all', {title: 'Todos los productos', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    ni:(req, res) => {
        db.Producto.findAll()
            .then(function(productos){
                res.render('Nintendo', {title: 'Nintendo', cssFile : 'style', listpro:productos, toThousand:toThousand})
            })
        // res.render('Nintendo', {title: 'Nintendo', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    ps:(req, res) => {
        db.Producto.findAll()
            .then(function(productos){
                res.render('PS', {title: 'Playstation', cssFile : 'style', listpro:productos, toThousand:toThousand})
            })
       // res.render('PS', {title: 'Playstation', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    xb:(req, res) => {
        db.Producto.findAll()
            .then(function(productos){
                res.render('Xbox', {title: 'Xbox', cssFile : 'style', listpro:productos, toThousand:toThousand})
            })
        //res.render('Xbox', {title: 'Xbox', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    },
    edit: (req, res) => {
        db.Producto.findByPk(parseInt(req.params.id,10),{
            include:[{association:'consola'}]
        })
        .then(function(resprod){
            res.render('edit-form',{ title: 'Editar producto', cssFile: 'style',listpro3:resprod, string:string})
        })

//        let id= parseInt(req.params.id,10)
//        const complist = listpro.find(p => p.id === id)
//        res.render('edit-form',{ title: 'Editar producto', cssFile: 'style',listpro3:complist, string:string})
    },
    actualizar: (req, res) => {
        let errors=validationResult(req);
        if(errors.isEmpty()){
            if(req.file){
                if(req.file.filename){
                    db.Producto.update({
                        nombre:req.body.nombre,
                        rating: parseInt(req.body.rating,10),
                        precio: parseInt(req.body.precio,10),
                        breveDescripcion: req.body.breveDescripcion,
                        informacionAdicional: req.body.informacionAdicional,
                        imagenPrincipal:req.file.filename,
                        idPlataforma:parseInt(req.body.plataforma,10),
                        idConsola:parseInt(req.body.consola,10),
                        idCategoria:parseInt(req.body.categoria,10)
                    },{
                        where: {
                            idProductos: parseInt(req.params.id,10)
                        }
                    }).then(function(result){
                        console.log(result)
                        res.redirect('/products/detail/'+ parseInt(req.params.id,10))
                    })
                    .catch(error => res.JSON(error))
                }
            }else{
                console.log(req.params.id)
                console.log(req.body)
                db.Producto.update({
                    nombre:req.body.nombre,
                    rating: parseInt(req.body.rating,10),
                    precio: parseInt(req.body.precio,10),
                    breveDescripcion: req.body.breveDescripcion,
                    informacionAdicional: req.body.informacionAdicional,
                    idPlataforma:parseInt(req.body.plataforma,10),
                    idConsola:parseInt(req.body.consola,10),
                    idCategoria:parseInt(req.body.categoria,10)
                },
                {
                    where: {idProductos: parseInt(req.params.id)}
                    
                }).then(function(a)
                {res.redirect('/products/detail/'+ parseInt(req.params.id,10))});
            
            }
        }else{
            db.Producto.findByPk(parseInt(req.params.id,10),{
                include:[{association:'consola'}]
            })
            .then(function(resprod){
                res.render('edit-form',{ title: 'Editar producto', cssFile: 'style', errors: errors.mapped(), old: req.body, listpro3:resprod, string:string})
            })
            
        }

        
	

        // if(req.file){
        //     if(req.file.filename){
        //         let id= parseInt(req.params.id,10)
        //         let index= listpro.findIndex(game=>game.id==id)
        //         var imagenbor= "public/images/"+(listpro[index].imagenPrincipal)
        //         if(fs.existsSync(imagenbor)){
        //             fs.unlinkSync(imagenbor)
        //         }
        //         listpro.map(function(game){
        //             if(game.id == id){
        //                 game.nombre= req.body.nombre,
        //                 game.rating= parseInt(req.body.rating,10),
        //                 game.precio= parseInt(req.body.precio,10),
        //                 game.plataforma = req.body.plataforma,
        //                 game.consola= req.body.consola,
        //                 game.categoria= req.body.categoria,
        //                 game.breveDescripcion=req.body.breveDescripcion,
        //                 game.informacionAdicional=req.body.informacionAdicional,
        //                 game.imagenPrincipal=req.file.filename

        //             }
        //             return game
        //         })

        //     }
        // }else{
        //      let id= parseInt(req.params.id,10)
        //      listpro.map(function(game){
        //          if(game.id == id){
        //            game.nombre= req.body.nombre,
        //            game.rating= parseInt(req.body.rating,10),
        //            game.precio= parseInt(req.body.precio,10),
        //            game.plataforma = req.body.plataforma,
        //            game.consola= req.body.consola,
        //            game.breveDescripcion=req.body.breveDescripcion,
        //            game.informacionAdicional=req.body.informacionAdicional
        //            game.categoria= req.body.categoria
        //         }
        //         return game
        //      })
            
        // }
        // productosJSON= JSON.stringify(listpro, null, 2)

        // fs.writeFileSync(productsFilePath,productosJSON)
        // res.redirect('/products/all')
                // idPlataforma:parseInt(req.body.plataforma,10),
                // idConsola:parseInt(req.body.consola,10),
                // idCategoria:parseInt(req.body.categoria,10)
            
    },
    eliminar: (req,res)=>{

        db.Producto.destroy({
			where:{
				idProductos: parseInt(req.params.id,10)
			}
		})

		res.redirect('/products/all')
    }     
};

module.exports = controller;