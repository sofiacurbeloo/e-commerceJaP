//DECLARACION DE VARIABLES Y CONSTANTES
let pageTitle = document.querySelector('.h2');
let listEl = document.querySelector('#product-list');
let currentProductsArray = []; //ACTUAL ARRAY DE PRODUCTOS (CON O SIN FILTROS)
let originalArray = []; //ARRAY ORIGINAL DE PRODUCTOS
//FILTROS
let minCount = undefined;
let maxCount = undefined;
const ORDER_BY_COST = 'cost';
const ORDER_ASC_BY_PRICE = 'PRICE_ASC';
const ORDER_DESC_BY_PRICE = 'PRICE_DESC';
const ORDER_DESC_BY_RELEVANCE = 'RELEVANCE_DESC';
//BUSCADOR
const searchInput = document.getElementById('product-search');
const noResultMessage = document.getElementById('noResultsMessage');
const searchButton = document.getElementById('search-button');


//EVENTO AL CARGAR LA PAGINA
document.addEventListener('DOMContentLoaded', function () {
  const catID = localStorage.getItem('catID');
  //OBTIENE LA LISTA DE PRODUCTOS 
  getJSONData(`${PRODUCTS_URL}${catID}${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === 'ok') {
      originalArray = resultObj.data.products;
      currentProductsArray = originalArray;
      showProductsList(currentProductsArray); //MUESTRA LOS PRODUCTOS
      pageTitle.innerHTML = resultObj.data.catName.toUpperCase();
    }
  });

  //EVENTOS DE FILTROS
  document.getElementById('sortAsc').addEventListener('click', () => {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });
  document.getElementById('sortDesc').addEventListener('click', () => {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById('sortByRelevance').addEventListener('click', () => {
    sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
  });

  document.getElementById('clearRangeFilter').addEventListener('click', function () {
      document.getElementById('rangeFilterCountMin').value = '';
      document.getElementById('rangeFilterCountMax').value = '';
      minCount = undefined;
      maxCount = undefined;
      showProductsList(originalArray);
    });

  document.getElementById('sortAsc').addEventListener('click', () => {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });
  document.getElementById('sortDesc').addEventListener('click', () => {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById('sortByRelevance').addEventListener('click', () => {
    sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
  });
});

//FUNCION QUE GUARDA EL ID DEL PRODUCTO EN EL LOCAL STORAGE Y REDIRIGE A PRODUCT-INFO DE DICHO PRODUCTO
function setCatID(id) {
  localStorage.setItem('productID', id);
  window.location.href = 'product-info.html';
}

//FUNCION QUE MUESTRA LA LISTA DE PRODUCTOS
const showProductsList = (array) => {
  let HTMLtoAppend = '';

  for (let i = 0; i < array.length; i++) {
    let post = array[i];

    if ((minCount == undefined || (minCount != undefined && parseInt(post.cost) >= minCount)) && (maxCount == undefined || (maxCount != undefined && parseInt(post.cost) <= maxCount))) {
      HTMLtoAppend += `
      <div class="product-card" onclick="setCatID(${post.id})">
                  <div class='card-image'>
                    <img src='${post.image}' class="card-img-top card-image" alt="'${post.image}'" />
                  </div>
                    <div class="card-content">
                      <div class="title-description subtitle-2">
                        <h5 class="card-title">${post.name}</h5>
                        <p class="card-text card-text-hight body-light">
                        ${post.description}
                        </p>
                      </div>
                      <div class="price-qty">
                        <p class="subtitle-1">$${post.cost}</p>
                        <p class="body-light">${post.soldCount} art.</p>
                    </div>
                </div>
                </div>
              `;
    }
  }
  listEl.innerHTML = HTMLtoAppend;
};



//FUNCION DEL BUSCADOR
function filterResults (){
  let regex = new RegExp(searchInput.value, 'i');
  let matchProducts = [];
  currentProductsArray.forEach(element => {   
      if(regex.test(element.name) || regex.test(element.description)){
          matchProducts.push(element);
          currentProductsArray = matchProducts;
          showProductsList(currentProductsArray);
          noResultMessage.style.display = "none";        
      } else {
          matchProducts= []
          showProductsList(matchProducts)
          noResultMessage.style.display = '';    
      }      
      resetProducts();       
  });  
}

//FUNCION QUE MUESTRA LOS PRODUCTOS DE NUEVO SI EL INPUT ESTA VACIO
function resetProducts (){
  if (searchInput.value == ""){
      currentProductsArray = originalArray;
      showProductsList(currentProductsArray);
      console.log("Reseteado")
  }
}

//EVENTOS DEL BUSCADOR
searchInput.addEventListener('input', filterResults);
searchButton.addEventListener('click', filterResults);

//FUNCION SORT:
function sortProducts(criteria, array) {
  let result = [];

  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort((a, b) => {
      return a.cost - b.cost;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      return b.cost - a.cost;
    });
  } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_COST) {
    if (minCount != undefined && maxCount != undefined) {
      result = array.filter((product) => {
        return (
          parseInt(product.cost) <= maxCount &&
          parseInt(product.cost) >= minCount
        );
      });
    } else if (minCount != undefined) {
      result = array.filter((product) => {
        return parseInt(product.cost) >= minCount;
      });
    } else if (maxCount != undefined) {
      result = array.filter((product) => {
        return parseInt(product.cost) <= maxCount;
      });
    }
  }
  return result;
}

//FUNCION QUE ORDENA Y MUESTRA LOS PRODUCTOS
function sortAndShowProducts(sortCriteria) {
  const sortedProducts = sortProducts(sortCriteria, currentProductsArray);
  showProductsList(sortedProducts);
}

// FILTER:
document
  .getElementById('rangeFilterCount')
  .addEventListener('click', function () {
    //OBTENGO EL MÍNIMO Y MÁXIMO DE LOS INTERVALOS PARA FILTRAR POR CANTIDAD DE PRODUCTOS POR CATEGORÍA
    minCount = document.getElementById('rangeFilterCountMin').value;
    maxCount = document.getElementById('rangeFilterCountMax').value;

    if (minCount != undefined && minCount != '' && parseInt(minCount) >= 0) {
      minCount = parseInt(minCount);
    } else {
      minCount = undefined;
    }

    if (maxCount != undefined && maxCount != '' && parseInt(maxCount) >= 0) {
      maxCount = parseInt(maxCount);
    } else {
      maxCount = undefined;
    }
    sortAndShowProducts(ORDER_BY_COST);
  });

 