//DECLARACION DE VARIABLES Y CONSTANTES
const image = document.getElementById("profile-picture");
const imagePreview = "img/user-icon-generic.png";

//EVENTO AL CARGAR LA PAGINA
document.addEventListener("DOMContentLoaded", function() {
    
    // Obtener los datos de la sesión desde localStorage
    const userSession = JSON.parse(localStorage.getItem('userSession')); // Solo necesitas parsear una vez
    const emailField = document.getElementById("email");

    // Verificar si existe la información del usuario en el localStorage
    if (userSession) {
        // Acceder al campo "username" que contiene el email
        const userEmail = userSession.username;

        // Asignar el valor de "username" al campo de email en el formulario
        emailField.value = userEmail;
    }

    // Cargar otros datos del perfil desde localStorage si existen
    const firstName = localStorage.getItem("firstName");
    const secondName = localStorage.getItem("secondName");
    const lastName = localStorage.getItem("lastName");
    const secondLastName = localStorage.getItem("secondLastName");
    const phone = localStorage.getItem("phone");

    if (firstName) document.getElementById("firstName").value = firstName;
    if (secondName) document.getElementById("secondName").value = secondName;
    if (lastName) document.getElementById("lastName").value = lastName;
    if (secondLastName) document.getElementById("secondLastName").value = secondLastName;
    if (phone) document.getElementById("phone").value = phone;

    // Al hacer clic en el botón "Guardar cambios"
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Validar los campos obligatorios
        const firstNameValue = document.getElementById("firstName").value.trim();
        const lastNameValue = document.getElementById("lastName").value.trim();
        const emailValue = emailField.value.trim();

        if (!firstNameValue || !lastNameValue || !emailValue) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        // Guardar los datos en localStorage
        localStorage.setItem("firstName", firstNameValue);
        localStorage.setItem("secondName", document.getElementById("secondName").value.trim());
        localStorage.setItem("lastName", lastNameValue);
        localStorage.setItem("secondLastName", document.getElementById("secondLastName").value.trim());
        localStorage.setItem("phone", document.getElementById("phone").value.trim());

        alert("Los datos se han guardado correctamente.");
    });

    //AL CARGAR LA PAGINA, CHEQUEA SI HAY ALGINA IMAGEN CARGADA EN EL LOCALSTORAGE, DE NO SER ASI, CARGA LA IMAGEN GENERICA
    const imageSource = localStorage.getItem("profilePicture");
    image.src = imageSource ? imageSource : imagePreview;
});

/*FUNCION QUE PERMITE AL HACER CLICK EN EL BOTON DE MODIFICAR IMAGEN, SE CARGUE DESDE LA PC 
LOCAL UNA IMAGEN, QUE SE GUARDARA EN EL LOCAL STORAGE EN FORMATO BASE64 */
document.getElementById('change-picture-icon').addEventListener('click', function() {
    document.getElementById('fileInput').click(); 
});

//FUNCIÓN PARA CAMBIAR LA IMAGEN DE PERFIL
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
    console.log(file);
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let base64img = e.target.result;
            localStorage.setItem("profilePicture", base64img);
            image.src = base64img; 
        }
        reader.readAsDataURL(file); 

    }
});


