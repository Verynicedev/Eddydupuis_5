"use strict";

import { urlApi } from "/front/js/urlApi.js";                       // Rappel de l'url de l'API
import { setProductLocalStorage } from "/front/js/fonction.js";     // Envoi les informations dans le local storage
import { getProductsInLocalStorage } from "/front/js/fonction.js";  // Récupere les informations dans le local storage

// Récupération de la chaine de requête dans l'url
const urlId = window.location.search;

// Extraction de l'id
const urlSearchParams = new URLSearchParams(urlId);

// Récupère l'id du produit
const idProduct = urlSearchParams.get("id");

const quantityValue = document.getElementById("quantity");
let productsStoreInLocalStorage = getProductsInLocalStorage();

const productToDisplay = await loadingDataApi();

listenerAddToCart();
displayProductPage(productToDisplay);
displayColors(productToDisplay);

// Récupère l'id du produit à afficher
async function loadingDataApi() {
  try {
    // Appel l'API grâce à l'id du produit
    const response = await fetch(`${urlApi}products/${idProduct}`);
    // Réponse de l'API
    const arrayProduct = await response.json();
    return arrayProduct;
  } catch (e) {
    alert("Une erreur est survenue");
  }
}

// Intégration des blocs HTML et des valeurs du produit récupéré dans l'API
function displayProductPage(selectedProduct) {
  const selectedImage = document.querySelector(".item__img");
  selectedImage.innerHTML = `<img src="${selectedProduct.imageUrl}" alt="${selectedProduct.altTxt}">`;
  document.querySelector("#title").innerHTML = selectedProduct.name;
  document.querySelector("#price").innerHTML = selectedProduct.price;
  document.querySelector("#description").innerHTML =
    selectedProduct.description;
}

// Affichage des couleurs disponible pour le produit
function displayColors(product) {
  const colorsOfTheProduct = product.colors;
  colorsOfTheProduct.forEach((colorsProduct) => {
    const selectColors = document.querySelector("#colors");
    const choiceColors = document.createElement("option");
    selectColors.appendChild(choiceColors);
    const displayColorsProducts = (choiceColors.value = colorsProduct);
    choiceColors.innerHTML = displayColorsProducts;
  });
}

// Récupère les informations du produit saisie par l'utilisateur
function usersProductChoice() {
  const userChoice = {
    name: document.getElementById("title").innerHTML,
    image: document.querySelector(".item__img img").getAttribute("src"),
    altTxt: document.querySelector(".item__img img").getAttribute("alt"),
    price: document.querySelector("#price").textContent,
    idProduit: idProduct,
    color: document.querySelector("#colors").value,
    quantity: parseInt(quantityValue.value),
  };
  return userChoice;
}

// Analyse la quantité du produit et va les enregistrer dans le local storage selon la couleur du produit
function quantityConditionAddToCard() {
  const userChoice = usersProductChoice();
  if (                                                              // Si la quantité est supérieur à 0 et inférieur à 100 et que la couleur est égale 0
    quantityValue.value > 0 &&
    quantityValue.value <= 100 &&
    colors.value != 0
  ) {
    window.location.href = "cart.html";
    if (productsStoreInLocalStorage) {                              // Si le localStorage contient déjà un produit rajoute le produit existant
      const productFind = productsStoreInLocalStorage.find(
        (product) =>
          product.idProduit === userChoice.idProduit &&
          product.color === colors.value
      );
      if (productFind) {
        productFind.quantity += userChoice.quantity;                // Mise a jour du localStorage avec les choix de l'utilisateur
        setProductLocalStorage(productsStoreInLocalStorage);
      } else {
        productsStoreInLocalStorage.push(userChoice);
        setProductLocalStorage(productsStoreInLocalStorage);
      }
    }
    else {                                                          
      productsStoreInLocalStorage = [];                             // Création du localStorage (vide)
      productsStoreInLocalStorage.push(userChoice);                 // Mise a jour du localStorage avec le choix de l'utilisateur
      setProductLocalStorage(productsStoreInLocalStorage);
    }
  } else {
    alert("Merci de choisir une couleur et une quantité");
  }
}

// Envoi le produit dans le panier
function listenerAddToCart() {                                      // Bouton "ajouter au panier" (fonctionel)
  const selectBtnAddToCart = document.getElementById("addToCart");
  selectBtnAddToCart.addEventListener("click", (event) => {
    event.preventDefault();
    quantityConditionAddToCard();
  });
}