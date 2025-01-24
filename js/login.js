//DECLARACION DE VARIABLES Y CONSTANTES
let inputArray = document.querySelectorAll("input");
let signBtn = document.getElementById("signBtn");
let password = document.getElementById("password-input");
let user = document.getElementById("user-input");
let eyeOpen = document.getElementById('password-icon-show');
let eyeClosed = document.getElementById('password-icon-hide');


//FUNCIÓN QUE MUESTRA ERROR SI LOS CAMPOS NO ESTAN CORRECTOS
function showError(input) {
    let inputBox = input.closest('.input-box');
    inputBox.classList.add('error'); // agrego la clase eror al contenedor
    document.getElementById("error").style.display = "block";
}

//FUNCIÓN QUE DEJA DE MOSTRAR EL ERROR EN CASO DE QUE LOS CAMPOS SE CORRIGAN
function hideError(input) {
    let inputBox = input.closest('.input-box');
    inputBox.classList.remove('error'); // remuevo la clase error del contenedor
}

//FUNCIÓN QUE VALIDA QUE LOS CAMPOS SEAN VALIDOS
function inputValidation() {
    let isValid = true;

    inputArray.forEach(input => {
        if (input.value === "" || input.value.length < 3) {
            showError(input); // muestra el error si el campo no es valido
            isValid = false;
        } else {
            hideError(input); // oculta si el campo es valido
        }
    });

    return isValid;
}

//AL APRETAR INGRESAR, TE LLEVA A LA PAGINA PRINCIPAL SI ES VALIDO
signBtn.addEventListener("click", function () {
    if (inputValidation()) {
        // Session storage
        let token = password.value;
        let userName = user.value;
        console.log(token, userName);
        loginUser(userName, token);
        // Redirige a la página principal
        window.location.href = "index.html";
    }
});

// evento que me muestra u oculta contraseña
document.getElementById("show-hide-button").addEventListener("click", function () {
    if (password.type == "password") {
        password.type = "text";
          eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        password.type = "password";
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
});

//FUNCIÓN QUE CREA UN OBJETO CON LOS DATOS DEL LOG-IN USUARIO Y LO GUARDA EN EL SESSION STORAGE
function loginUser(username, token) {
    const userSession = {
        username: username,
        token: token,
        loggedIn: true
    };

    // usamos localStorage para guardar los datos de la sesión del usuario
    localStorage.setItem('userSession', JSON.stringify(userSession));
    console.log('Log in correcto y sesión guardada.');
}



