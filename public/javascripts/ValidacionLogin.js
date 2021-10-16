window.addEventListener('load', function(){
    let forms = document.querySelector('.LoginForm');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    
    const validarEmail = input =>{
        const correo =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+\.\S+/.test(input.value)
        
        if(input.value === ''){
            input.placeholder = "Correo Electronico obligatorio";
            input.style.backgroundColor = "orange";
        }
        else if(!correo) {
            input.placeholder = "Escriba un correo electronico valido, por favor";
            input.style.backgroundColor = "orange";
            input.value = "";
        } else {
            input.classList.remove('invalid');
            input.style.backgroundColor = "white";
        }
    }

    const validarPassword = input => {
        if(input.value === ''){
            input.placeholder = "Contraseña Obligatoria";
            input.style.backgroundColor = "orange";
        }else{
            input.style.backgroundColor = "white";
        }
    }

    //el evento blur para detectar cuando el usuario haga clic fuera del input
    email.addEventListener("blur", function(){ validarEmail(email); })
    password.addEventListener("blur", function(){ validarPassword(password); })

    forms.addEventListener("submit", function(e) {
        validateEmail()
        validatePassword()
        e.preventDefault();
    })
})