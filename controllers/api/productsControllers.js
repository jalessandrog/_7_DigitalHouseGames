const fs = require('fs');
const path = require('path');
const methodOverride=require('method-override');
const { body } = require('express-validator');
let db=require('../../database/models');
const { debugPort, send } = require('process');
const { validationResult } = require('express-validator')


// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const listpro = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const string= n=>n.toString()

// Variables para hacer las cuentas por categoria
var constp=[]
var constp1=[]
var constp2=[]
var constc=[]
var constc1=[]
var constc2=[]
var constc3=[]
var constc4=[]
var constc5=[]

const controller = {
    index: (req, res) => {
        db.Producto.findAll()
            .then(function(productos){
                res.json({
                   count:productos.length,
                   countByCategory:{
                        PlayStation_p: productos.forEach(art =>{
                            if(art.idPlataforma==1){
                                constp.push(art.idPlataforma)
                            }  
                        }),
                        PlayStation: constp.length,
                        Xbox_p:productos.forEach(art =>{
                            if(art.idPlataforma==2){
                                constp1.push(art.idPlataforma)
                            }  
                        }),
                        Xbox:constp1.length,
                        Nintendo_p:productos.forEach(art =>{
                            if(art.idPlataforma==3){
                                constp2.push(art.idPlataforma)
                            }  
                        }),
                        Nintendo:constp2.length,
                        PlayStation_5_c:productos.forEach(art =>{
                            if(art.idConsola==1){
                                constc.push(art.idPlataforma)
                            }  
                        }),
                        PlayStation_5:constc.length,
                        PlayStation_4_c:productos.forEach(art =>{
                            if(art.idConsola==1){
                                constc1.push(art.idPlataforma)
                            }  
                        }),
                        PlayStation_4:constc1.length,
                        Xbox_One_c:productos.forEach(art =>{
                            if(art.idConsola==1){
                                constc2.push(art.idPlataforma)
                            }  
                        }),
                        Xbox_One:constc2.length,
                        
                        _c:productos.forEach(art =>{
                            if(art.idConsola==1){
                                constc2.push(art.idPlataforma)
                            }  
                        }),
                        Xbox_One:constc2.length,
                   },
                   products:productos.map(art => {
                        return {id: art.idProductos,
                                name:art.nombre,
                                description:art.breveDescripcion,
                                Plataforma: [art.idProductos],
                                detail: "api/products/" + art.idProductos }
                       
                    
                   })

                })
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
    }
       
};

module.exports = controller;