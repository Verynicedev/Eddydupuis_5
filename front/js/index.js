"use strict";

import { urlApi } from "/front/js/urlApi.js";

const productsToLoad = await loadingProductApi();

displayProductsHome();

// Construction de notre interface HTML et intégration de nos produits via l'API
function displayProductHome(product) {                          // Appel du DOM pour faire la liaison entre le HTML et le javaScript
  const selectIdItem = document.getElementById("items");        // On appelle la classe "items" de notre HTML
  const createHref = document.createElement("a");               // Création d'un hyperlien
  createHref.href = `product.html?id=${product._id}`;           // Mise en forme de nos liens
  selectIdItem.appendChild(createHref);
  createHref.innerHTML =                                        // Model de l'interface HTML
  `<article> 
      <img src="${product.imageUrl}" alt="${product.altTxt}"> 
      <h3 class="productName"> ${product.name}</h3>
      <p class="productDescription">${product.description}</p> 
    </article> 
  </a>`;
}

// Récupère tous les produits à afficher et les intègrent dans le html
function displayProductsHome() {
  productsToLoad.forEach((product) => {                          // Pour chaque produit trouvé -> l'afficher
    displayProductHome(product);
  });
}

// Chargement de nos prodruits via l'API
async function loadingProductApi() {
  try {
    const response = await fetch(`${urlApi}products`);          // Appel de l'Api
    const promiseApi = await response.json();                   // Reponse de l'Api
    return promiseApi;
  } catch (error) {
    alert("Une erreur est survenue");
  }
}

