window.addEventListener('load', function(){
    let forms = document.querySelector('.RegisterForm');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let nombre = document.querySelector('#nombre');
    let apellidos = document.querySelector('#apellidos');
    let avatar = document.querySelector('#avatar');
    
    const validarNombre = input =>{
        let name = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.value)
        
        if(input.value === ''){
            input.placeholder = "Campo obligatorio";
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} is required`
        }else if((input.value).length<=2 || !name){
            input.placeholder = "Debe escribir un nombre valido";
            input.style.backgroundColor = "orange";
            input.value = "";
            errors[select.name] = `${select.name} invalido`
            alert('[ERROR] El campo debe tener un valor de...');
        }else{
            input.classList.remove('invalid');
            input.style.backgroundColor = "white";
        }
    }

    const validarApellidos = input =>{
        let name = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.value)
        
        if(input.value === ''){
            input.placeholder = "Campo obligatorio";
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} is required`
        }else if((input.value).length<=2 || !name){
            input.placeholder = "Debe escribir apellidos validos";
            input.style.backgroundColor = "orange";
            input.value = "";
            errors[select.name] = `${select.name} invalido`
            alert('[ERROR] El campo debe tener un valor de...');
        }else{
            input.classList.remove('invalid');
            input.style.backgroundColor = "white";
        }
    }


    const validarEmail = input =>{
        const correo =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+\.\S+/.test(input.value)
        
        if(input.value === ''){
            input.placeholder = "Correo Electronico obligatorio";
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} is required`
        }
        else if(!correo) {
            input.placeholder = "Escriba un correo electronico valido, por favor";
            input.style.backgroundColor = "orange";
            input.value = "";
            errors[select.name] = `${select.name} es invalido`
        } else {
            input.classList.remove('invalid');
            input.style.backgroundColor = "white";
        }
    }

    const validarPassword = input => {

        if(input.value === ''){
            input.placeholder = "Contraseña Obligatoria";
            input.style.backgroundColor = "orange";
            input.value = "";
            errors[select.name] = `${select.name} is required`
        }else if((input.value).length<8){
            input.placeholder = "Contraseña insegura";
            input.value = "";
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} seguridad baja`
        }
        else{
            input.style.backgroundColor = "white";
        }
    }

    const validarFile = input => {
        if (!window.FileReader) {
            alert('El navegador no soporta la lectura de archivos');
            return;
        }
        if (/.(gif|jpeg|jpg|png)$/i.test(file.value)){
            alert('Comprueba la extensión de tus imagenes, recuerda que los formatos aceptados son .gif, .jpeg, .jpg y .png');
        }

    //el evento blur para detectar cuando el usuario haga clic fuera del input
    email.addEventListener("blur", function(){ validarEmail(email); })
    password.addEventListener("blur", function(){ validarPassword(password); })
    nombre.addEventListener("blur", function(){ validarNombre(nombre); })
    apellidos.addEventListener("blur", function(){ validarApellidos(apellidos); })
    avatar.addEventListener("onchange", function(){ validarFile(avatar); })

    function ValidacionForm() {
        validarEmail()
        validarPassword()
        validarNombre()
        validarApellidos()
        validarFile()
    }

    forms.addEventListener("submit", function(event) {
        if(Object.keys(errors).length) {
            event.preventDefault();
            event.stopPropagation();
            console.log(errors)
        }
        console.log('Autenticación exitosa')
    })
})