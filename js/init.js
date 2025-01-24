const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

document.addEventListener("DOMContentLoaded", ()=> {
  cargarMenu();
  
})

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


//FUNCIÓN QUE CARGA EL MENU DESPLEGABLE CON LAS OPCIONES DE IR AL CARRITO Y MI PERFIL
function cargarMenu(){
  fetch("menu.html")
  .then(response => response.text())
  .then(data => {
      document.getElementById("menu-placeholder").innerHTML = data;
        if (document.getElementById("user-name")) {
          checkLoginStatus();
      }
  })
  .catch(error => console.error("Error al cargar el menú:", error));
}

//FUNCIÓN QUE CORROBORA SI HAY UNA SESION GUARDADA DEL USUARIO, ES DECIR, SI ESTA LOGGEADO
function checkLoginStatus() {
  //Obtenemos los datos guardados de la sesión
  const userSession = JSON.parse(localStorage.getItem('userSession'));

  //Corroboramos si existe una sesión guardada, y si el usuario inició sesión:
  if (userSession && userSession.loggedIn) {
      console.log(`Bienvenido/a, ${userSession.username}`);

      // Si no está loggeado, es redirigido a login-html
  } else {
      window.location.href= "login.html"
      console.log('El usuario no tiene una sesión iniciada. Redirigir al log-in');
  }
  
      // Desafíate entrega 2, mostrar usuario el parte derecha del navbar
      document.getElementById('user-name').textContent = userSession.username;

}

//FUNCIÓN PARA CERRAR SESION
function logout() {
  console.log('Función de cerrar sesión llamada'); 
  localStorage.removeItem('userSession');
  localStorage.removeItem("firstName");
  localStorage.removeItem("secondName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("secondLastName");
  localStorage.removeItem("phone");
  console.log('Sesión cerrada y datos eliminados de localStorage.');
  window.location.href = 'index.html';
}


//EVENTO DEL BOTON PARA IR HACIA ARRIBA
document.addEventListener('scroll', function() {
  if(document.documentElement.scrollTop > 100) {
   document.querySelector('.go-top-container').classList.add('show-button');

  } else {
   document.querySelector('.go-top-container').classList.remove('show-button');
  }
});

document.querySelector('.go-top-container').addEventListener('click', function() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const body = document.body;

  // Verificar si el modo oscuro está activado en localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('active');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const darkModeToggle = document.querySelector(".dark-mode");
  if (darkModeToggle) {
      const body = document.body;

      // Verificar si el modo oscuro estaba habilitado antes
      if (localStorage.getItem('darkMode') === 'enabled') {
          body.classList.add('active');
      }

      darkModeToggle.addEventListener("click", () => {
          console.log("Dark mode toggled");
          body.classList.toggle("active");

          // Guardar el estado en localStorage
          if (body.classList.contains('active')) {
              localStorage.setItem('darkMode', 'enabled');
          } else {
              localStorage.setItem('darkMode', 'disabled');
          }
      });
    }
});
