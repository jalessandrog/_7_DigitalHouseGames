window.addEventListener('load', function(){
    let forms = document.querySelector('.LoginForm');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    
    let pEmail=document.querySelector('#errorEmail')
    let pPassword=document.querySelector('#errorPassword')

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
        if(input.value === ''){
            input.placeholder = "Contraseña Obligatoria";
            pPassword.classList.add("mostrar");
            pPassword.innerHTML= "Contraseña Obligatoria"
            input.style.backgroundColor = "orange";
            errors[select.name] = `${select.name} is required`
        }else{
            input.style.backgroundColor = "white";
            pPassword.classList.remove("mostrar");
            pPassword.classList.add("ocultar");
        }
    }

    //el evento blur para detectar cuando el usuario haga clic fuera del input
    email.addEventListener("blur", function(){ validarEmail(email); })
    password.addEventListener("blur", function(){ validarPassword(password); })

    function ValidacionForm() {
        validarEmail()
        validarPassword()
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