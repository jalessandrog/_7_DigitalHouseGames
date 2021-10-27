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

var constca=[]
var constca1=[]
var constca2=[]
var constca3=[]

var constp2=[]
var constp12=[]
var constp22=[]

var constc2=[]
var constc12=[]
var constc22=[]
var constc32=[]
var constc42=[]
var constc52=[]

var constca2=[]
var constca12=[]
var constca22=[]
var constca32=[]

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
                            if(art.idConsola==2){
                                constc1.push(art.idPlataforma)
                            }  
                        }),
                        PlayStation_4:constc1.length,
                        Xbox_One_c:productos.forEach(art =>{
                            if(art.idConsola==3){
                                constc2.push(art.idPlataforma)
                            }  
                        }),
                        Xbox_One:constc2.length,
                        
                        Xbox_Series_S_c:productos.forEach(art =>{
                            if(art.idConsola==4){
                                constc3.push(art.idPlataforma)
                            }  
                        }),
                        Xbox_Series_S:constc3.length,

                        Xbox_Series_X_c:productos.forEach(art =>{
                            if(art.idConsola==5){
                                constc4.push(art.idPlataforma)
                            }  
                        }),
                        Xbox_Series_X:constc4.length,

                        Nintendo_Switch_c:productos.forEach(art =>{
                            if(art.idConsola==6){
                                constc5.push(art.idPlataforma)
                            }  
                        }),
                        Nintendo_Switch:constc5.length,

                        Lo_mas_nuevo_c:productos.forEach(art =>{
                            if(art.idCategoria==1){
                                constca.push(art.idPlataforma)
                            }  
                        }),
                        Lo_mas_nuevo:constca.length,

                        Lo_mas_comprado_c:productos.forEach(art =>{
                            if(art.idCategoria==2){
                                constca1.push(art.idPlataforma)
                            }  
                        }),
                        Lo_mas_comprado:constca1.length,

                        Mejores_ofertas_c:productos.forEach(art =>{
                            if(art.idCategoria==3){
                                constca2.push(art.idPlataforma)
                            }  
                        }),
                        Mejores_ofertas:constca2.length,

                        Preventas_c:productos.forEach(art =>{
                            if(art.idCategoria==4){
                                constca3.push(art.idPlataforma)
                            }  
                        }),
                        Preventas:constca3.length,


                   },
                   products:productos.map(art => {
                        return {id: art.idProductos,
                                name:art.nombre,
                                description:art.breveDescripcion,
                                plataforma: [art.idProductos],
                                detail: "/api/products/" + art.idProductos }
                       
                    
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
                res.json({
                    id: prod.idProductos,
                    name: prod.nombre,
                    rating: prod.rating,
                    price: prod.precio,
                    description: prod.breveDescripcion,
                    extraInformation: prod.informacionAdicional,
                    plataform: [prod.idProductos],
                    console: [prod.idConsola],
                    category: [prod.idCategoria],
                    img:"/images/" + prod.imagenPrincipal
                })
            })

            
//        let id= parseInt(req.params.id,10)
//        const complist = listpro.find(p => p.id === id)
//        res.render('detail', {title: 'Detalles del producto', cssFile : 'style',listpro2:complist,listpro:listpro, toThousand:toThousand })
    },
    appCat:(req, res) => {
        db.Producto.findAll()
            .then(function(productos){
                res.json({
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
                        if(art.idConsola==2){
                            constc1.push(art.idPlataforma)
                        }  
                    }),
                    PlayStation_4:constc1.length,
                    Xbox_One_c:productos.forEach(art =>{
                        if(art.idConsola==3){
                            constc2.push(art.idPlataforma)
                        }  
                    }),
                    Xbox_One:constc2.length,
                    
                    Xbox_Series_S_c:productos.forEach(art =>{
                        if(art.idConsola==4){
                            constc3.push(art.idPlataforma)
                        }  
                    }),
                    Xbox_Series_S:constc3.length,

                    Xbox_Series_X_c:productos.forEach(art =>{
                        if(art.idConsola==5){
                            constc4.push(art.idPlataforma)
                        }  
                    }),
                    Xbox_Series_X:constc4.length,

                    Nintendo_Switch_c:productos.forEach(art =>{
                        if(art.idConsola==6){
                            constc5.push(art.idPlataforma)
                        }  
                    }),
                    Nintendo_Switch:constc5.length,

                    Lo_mas_nuevo_c:productos.forEach(art =>{
                        if(art.idCategoria==1){
                            constca.push(art.idPlataforma)
                        }  
                    }),
                    Lo_mas_nuevo:constca.length,

                    Lo_mas_comprado_c:productos.forEach(art =>{
                        if(art.idCategoria==2){
                            constca1.push(art.idPlataforma)
                        }  
                    }),
                    Lo_mas_comprado:constca1.length,

                    Mejores_ofertas_c:productos.forEach(art =>{
                        if(art.idCategoria==3){
                            constca2.push(art.idPlataforma)
                        }  
                    }),
                    Mejores_ofertas:constca2.length,

                    Preventas_c:productos.forEach(art =>{
                        if(art.idCategoria==4){
                            constca3.push(art.idPlataforma)
                        }  
                    }),
                    Preventas:constca3.length,


               }

                })
            })
        // res.render('all', {title: 'Detalles del producto', cssFile : 'style', listpro:listpro, toThousand:toThousand})
    }
};

module.exports = controller;