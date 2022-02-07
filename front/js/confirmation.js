"use strict";

// Récupère la chaine de requête dans l'URL
const urlId = window.location.search;

// Extraction de l'id
const urlSearchParams = new URLSearchParams(urlId);

// Récupère le numero de la commande
const idOrderNumber = urlSearchParams.get("id");

// Affiche le numéro de la commande
document.getElementById("orderId").innerHTML = idOrderNumber;