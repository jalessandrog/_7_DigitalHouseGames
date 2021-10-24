
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

    camponombre.focus()
    let p1=document.querySelector('#error1')
    let p2=document.querySelector('#error2')
    let p5=document.querySelector('#error5')

    camponombre.addEventListener('blur', ()=>{
       
        if(camponombre.value===""){
            p1.innerHTML='Debes poner el nombre del producto'
        }else if(camponombre.value.length < 5 ){
            p1.innerHTML='Se deben tener por lo menos 5 caracteres'
        } else{
            p1.innerHTML=null
        }
    })
    
    productform.addEventListener('submit',(e)=>{
        if(1<2){
            e.preventDefault()
            
        }
    })

    
})

