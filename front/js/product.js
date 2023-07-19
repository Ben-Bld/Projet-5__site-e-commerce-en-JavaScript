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

//ajouter un event listener avec une fonction qui déclencher une fonction au clic de addToCart

addToCart.addEventListener("click", functionPanier);

//creation d'une fonction qui va créer un objet "detailsProduits" avec les détails du produit

function functionPanier() {
  let detailsProduit = {
    id: idItem,
    quantity: parseInt(document.getElementById("quantity").value),
    color: document.getElementById("colors").value,
  };

  //1) creation d'un array vide

  detailsProduitLocalStorage = [];
  //2) On envoie les details de l'article (detailsProduit) dans l'array

  // 3) On envoie le l'array (detailsProduitLocalStorage) dans le localstorage
  // 4) Si "panier" dans localStorage est vide, on y ajoute detailsProduit

  // 5) Si la selection de couleur et/ou de quantité est vide, on envoie une alerte

  if (detailsProduit.color == "") {
    alert("Selectionnez une couleur pour l'ajouter au panier");
  } else if (detailsProduit.quantity == 0) {
    alert("Sélectionnez au moins un article");
  } else {
    let cart1 = JSON.parse(localStorage.getItem("panier"));

    //6 On regarde si le localstorage est vide, puis on ajoute une nouvelle entrée
    if (localStorage.getItem("panier") == null) {
      detailsProduitLocalStorage.push(detailsProduit);

      localStorage.setItem(
        "panier",
        JSON.stringify(detailsProduitLocalStorage)
      );
    } else if (localStorage.getItem("panier") != null) {
      //Si l'article est déjà présent dans le localstorage, on modifie uniquement la quantité
      const articlePresent = cart1.find(
        (element) =>
          element.id == detailsProduit.id &&
          element.color == detailsProduit.color
      );
      if (articlePresent) {
        articlePresent.quantity =
          parseInt(detailsProduit.quantity) + parseInt(articlePresent.quantity);
        localStorage.setItem("panier", JSON.stringify(cart1));
      } else {
        detailsProduitLocalStorage = JSON.parse(localStorage.getItem("panier"));
        detailsProduitLocalStorage.push(detailsProduit);
        localStorage.setItem(
          "panier",
          JSON.stringify(detailsProduitLocalStorage)
        );
       
      }

    
  
    }
  }
}
