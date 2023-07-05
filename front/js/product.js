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
    const prix = document.getElementById('price');
    prix.innerHTML += `<span id="price">${data.price}<!-- 42 --></span>`

    const descriptionCanap = document.getElementById('description');
    descriptionCanap.innerHTML += ` <p id="description">${data.description}</p>`


    //creation de la balise image (non présente dans l'html)
    let ajout = document.querySelector('.item__img')
    let ajoutImage=  ajout.appendChild(document.createElement('img'))
    ajoutImage.setAttribute('src', `${data.imageUrl}`)
  });
