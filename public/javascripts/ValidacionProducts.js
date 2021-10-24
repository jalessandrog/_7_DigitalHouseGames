
window.addEventListener("load",function(){
    let productform=document.querySelector("form.productform")
    let camponombre=document.querySelector('input.nombre')
    let campobrevedescripcion=document.querySelector('textarea.breveDescripcion')
    let campoprecio=document.querySelector('input.precio')
    let camporating=document.querySelector('input.rating')
    let campoplataforma=document.querySelector('input[name="plataforma"]:checked')
    let campoconsola=document.querySelector('input[name="consola"]:checked')
    let campocategoria=document.querySelector('select[name="categoria"]')
    let campoimg=document.querySelector('input[name="imagenPrincipal"]')


    let p1=document.querySelector('#error1')
    let p2=document.querySelector('#error2')
    let p3=document.querySelector('#error3')
    let p4=document.querySelector('#error4')
    let p5=document.querySelector('#error5')
    let p6=document.querySelector('#error6')
    let p7=document.querySelector('#error7')
    let p8=document.querySelector('#error8')


    // camponombre.addEventListener('blur', ()=>{
       
    //     if(camponombre.value===""){
    //         p1.innerHTML='Debes poner el nombre del producto'
    //     }else if(camponombre.value.length < 5 ){
    //         p1.innerHTML='Se deben tener por lo menos 5 caracteres'
    //     } else{
    //         p1.innerHTML=null
    //     }
    // })
    campos={
        nombre: false,
        brevedescripcion: false,
        precio: false,
        rating: false,
        plataforma: false,
        consola: false,
        categoria: false,
        img: false
    }
    function validatenombre(){
        if(camponombre.value == ""){
            p1.innerHTML='Debes poner el nombre del producto.'
        }else if(camponombre.value.length < 5 ){
            p1.innerHTML='Se deben tener por lo menos 5 caracteres.'
        }else{
            p1.innerHTML=null
            campos['nombre'] = true
        }
    }
    function validatebrevedescripcion(){
        if(campobrevedescripcion.value == ""){
            p2.innerHTML='Debes poner una descripción del producto.'
        }else if(campobrevedescripcion.value.length < 20 ){
            p2.innerHTML='Se deben tener por lo menos 20 caracteres.'
        }else{
            p2.innerHTML=null
            campos['brevedescripcion'] = true
        }
    }
    function validateprecio(){
        if(campoprecio.value == ""){
            p3.innerHTML='Debes poner un precio.'
        }else if(!Number.isInteger(parseInt(campoprecio.value,10))){
            p3.innerHTML='Se debe escribir un numero.'
        }else if(parseInt(campoprecio.value,10) < 0){
            p3.innerHTML='Se debe escribir un numero mayor a 0.'
        }else{
            p3.innerHTML=null
            campos['precio'] = true
        }
    }

    function validateform(){
        validatenombre()
        validatebrevedescripcion()
        validateprecio()
    }
    
    productform.addEventListener('submit',(e)=>{
        validateform()
        if(campos.nombre && campos.brevedescripcion && campos.precio && campos.rating && campos.plataforma && campos.consola && campos.categoria && campos.img){
            render('all')
        }else{
            e.preventDefault()
        }
    })

    
})

