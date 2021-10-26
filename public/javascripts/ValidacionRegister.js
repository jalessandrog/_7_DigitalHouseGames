window.addEventListener('load', function(){
    let forms = document.querySelector('.RegisterForm');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let nombre = document.querySelector('#nombre');
    let apellidos = document.querySelector('#apellidos');
    let avatar = document.querySelector('#avatar');
    
    let pNombre=document.querySelector('#errorNombre')
    let pEmail=document.querySelector('#errorEmail')
    let pApellidos=document.querySelector('#errorApellidos')
    let pPassword=document.querySelector('#errorPassword')
    let pAvatar=document.querySelector('#errorAvatar')



    const validarNombre = input =>{
        let name = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.value)
        
        if(input.value === ''){
            input.placeholder = "Campo obligatorio";
            pNombre.classList.add("mostrar");
            pNombre.innerHTML= "Campo Obligatorio"
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} is required`
        }else if((input.value).length<=2 || !name){
            input.placeholder = "Debe escribir un nombre valido";
            pNombre.classList.add("mostrar");
            pNombre.innerHTML= "Debe escribir un nombre valido";
            input.style.backgroundColor = "orange";
            input.value = "";
            errors[select.name] = `${select.name} invalido`
            alert('[ERROR] El campo debe tener un valor de...');
            
        }else{
            input.classList.remove('invalid');
            input.style.backgroundColor = "white";
            pNombre.classList.remove("mostrar");
            pNombre.classList.add("ocultar");
        }
    }

    const validarApellidos = input =>{
        let name = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.value)
        
        if(input.value === ''){
            input.placeholder = "Campo obligatorio";
            pApellidos.classList.add("mostrar");
            pApellidos.innerHTML= "Campo Obligatorio"
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} is required`
        }else if((input.value).length<=2 || !name){
            input.placeholder = "Debe escribir apellidos validos";
            pApellidos.classList.add("mostrar");
            pApellidos.innerHTML= "Debe escribir apellidos validos"
            input.style.backgroundColor = "orange";
            input.value = "";
            errors[select.name] = `${select.name} invalido`
            alert('[ERROR] El campo debe tener un valor de...');
        }else{
            input.classList.remove('invalid');
            input.style.backgroundColor = "white";
            pApellidos.classList.remove("mostrar");
            pApellidos.classList.add("ocultar");
        }
    }


    const validarEmail = input =>{
        const correo =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+\.\S+/.test(input.value)
        
        if(input.value === ''){
            input.placeholder = "Correo Electronico obligatorio";
            pEmail.classList.add("mostrar");
            pEmail.innerHTML= "Correo Electronico Obligatorio"
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} is required`
        }
        else if(!correo) {
            input.placeholder = "Escriba un correo electronico valido, por favor";
            pEmail.classList.add("mostrar");
            pEmail.innerHTML= "Correo Electronico Invalido"
            input.style.backgroundColor = "orange";
            input.value = "";
            errors[select.name] = `${select.name} es invalido`
        } else {
            input.classList.remove('invalid');
            input.style.backgroundColor = "white";
            pEmail.classList.remove("mostrar");
            pEmail.classList.add("ocultar");
        }
    }

    const validarPassword = input => {
        const password =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(input.value)

        if(input.value === ''){
            input.placeholder = "Contraseña Obligatoria";
            pPassword.classList.add("mostrar");
            pPassword.innerHTML= "Contraseña Obligatoria"
            input.style.backgroundColor = "orange";
            input.value = "";
            errors[select.name] = `${select.name} is required`
        }else if((input.value).length<8 || !password){
            input.placeholder = "La contraseña contener al menos un numero, una letra mayuscula, una letra minuscula, un caracter fuerte y un minimo de 8 caracteres";
            pPassword.classList.add("mostrar");
            pPassword.innerHTML= "La contraseña contener al menos un numero, una letra mayuscula, una letra minuscula, un caracter fuerte y un minimo de 8 caracteres"
            input.value = "";
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} seguridad baja`
        }
        else{
            input.style.backgroundColor = "white";
            pPassword.classList.remove("mostrar");
            pPassword.classList.add("ocultar");
        }
    }

    // const validarFile = file => {
    //     if (!window.FileReader) {
    //         alert('El navegador no soporta la lectura de archivos');
    //         return;
    //     }
    //     if (!(/\.(jpg|png|gif)$/i).test(uploadFile.name)){
    //         alert('Comprueba la extensión de tus imagenes, recuerda que los formatos aceptados son .jpeg, .jpg y .png');
    //         input.style.color= "red";
    //         input.style.border= "solid red"
    //     }
    // }

    const  validarFile = file =>{
        var filePath = file.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        if(!allowedExtensions.exec(filePath)){
            alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
            pAvatar.classList.add("mostrar");
            pAvatar.innerHTML= "Tipo de archivo invalido"
            file.value = '';
            return false;
        }else{
            pAvatar.classList.remove("mostrar");
            pAvatar.classList.add("ocultar");
            //Image preview
            if (file.files && file.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'" style="text-align: center;" width="100" height="100" />';
                };
                reader.readAsDataURL(file.files[0]);
            }
        }
    }

    //el evento blur para detectar cuando el usuario haga clic fuera del input
    email.addEventListener("blur", function(){ validarEmail(email); })
    password.addEventListener("blur", function(){ validarPassword(password); })
    nombre.addEventListener("blur", function(){ validarNombre(nombre); })
    apellidos.addEventListener("blur", function(){ validarApellidos(apellidos); })
    avatar.addEventListener("change", function(){ validarFile(avatar); })

    function ValidacionForm() {
        validarEmail()
        validarPassword()
        validarNombre()
        validarApellidos()
        validarFile()
    }

    forms.addEventListener("submit", function(event) {
        ValidacionForm()
        if(Object.keys(errors).length) {
            event.preventDefault();
            event.stopPropagation();
            console.log(errors)
        }
        console.log('Autenticación exitosa')
    })
})