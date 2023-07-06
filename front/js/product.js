// Chercher l'url et le stocker dans la variable "url"

let url = new URL(document.location).searchParams;

// stocker l'id de l'objet présent dans l'url, et le stocker dans idItem

const localhost = "http://localhost:3000/api/products";

//chercher l'id de l'item present dans l'url et le stocket dans idItem

const idItem = url.get("id");

//concatener pour obtenir l'url du produit

const urlProduct = localhost + "/" + idItem;

//chercher l'url du produit, et le convertir en json, puis modifier les elements via innerHTML
fetch(urlProduct)
  .then((response) => response.json())
  .then((data) => {
    //Creer variable pour aller chercher l'élément (titre, prix...)
    const titre = document.getElementById("title");
    //remplacer une partie du html avec le titre du produit obtenu au dessus
    titre.innerHTML += `<h1 id="title">${data.name}<!-- Nom du produit --></h1>`;

    //repeter la même chose pour les autres elements (prix, descript)
    const prix = document.getElementById("price");
    prix.innerHTML += `<span id="price">${data.price}<!-- 42 --></span>`;

    const descriptionCanap = document.getElementById("description");
    descriptionCanap.innerHTML += ` <p id="description">${data.description}</p>`;

    //creation de la balise image (non présente dans l'html)
    let ajout = document.querySelector(".item__img");
    let ajoutImage = ajout.appendChild(document.createElement("img"));
    ajoutImage.setAttribute("src", `${data.imageUrl}`);

    //ajout du choix de la couleur en utilisant une boucle for pour s'adapter au nombre de couleurs dispo à chaque article

    let choixCouleur = document.getElementById("colors");
    let ajoutChoixCouleur = "";
    for (i = 0; i < data.colors.length; i++) {
      ajoutChoixCouleur = choixCouleur.appendChild(
        document.createElement("option")
      );
      ajoutChoixCouleur.innerHTML += ` <option value="${data.colors[i]}">${data.colors[i]}</option>`;
    }

    //changer la balise <title> pour qu'elle corresponde au nom du produit
    document.title = `${data.name}`;
  });

//changer la balise title pour que ça corresponde au nom du produit

// sauvegarder le contenu du panier
let panier = "";

// selectionner le bouton "ajouter au panier"

let addToCart = document.getElementById("addToCart");

//ajouter un event listener avec une fonction qui va récupérer les éléments

addToCart.addEventListener("click", functionPanier);

//creation d'une fonction qui va créer un objet avec les détails du produit

localStorage.setItem("panier", {});

function functionPanier() {
  let detailsProduit = [{
    id: idItem,
    quantity: document.getElementById("quantity").value,
    color: document.getElementById("colors").value,
  }];



  localStorage.setItem("panier",JSON.stringify(detailsProduit))
  console.log(panier, localStorage[panier])
  }
 
  functionPanier()
  

//stocker le tout dans le localstorage

//ajouter selection au localstorage
