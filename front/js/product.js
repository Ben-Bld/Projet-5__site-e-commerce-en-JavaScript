// Récupérer les paramètres d'URL et stocker dans la variable "url"
let url = new URL(document.location).searchParams;

// on stocke l'id de l'objet présent dans l'URL dans "idItem"
const localhost = "http://localhost:3000/api/products";
const idItem = url.get("id");

// on construit l'URL du produit
const urlProduct = `${localhost}/${idItem}`;

// on récupére les données du produit depuis l'API et on met à jour les éléments du DOM avec les informations du produit
fetch(urlProduct)
  .then((response) => response.json())
  .then((data) => {
    // mise à jour des éléments du DOM avec les données du produit
    document.getElementById(
      "title"
    ).innerHTML = `<h1 id="title">${data.name}<!-- Nom du produit --></h1>`;
    document.getElementById(
      "price"
    ).innerHTML = `<span id="price">${data.price}<!-- 42 --></span>`;
    document.getElementById(
      "description"
    ).innerHTML = `<p id="description">${data.description}</p>`;

    // Ajout d'une balise image avec les attributs src et alt
    const ajout = document.querySelector(".item__img");
    const ajoutImage = document.createElement("img");
    ajoutImage.setAttribute("src", `${data.imageUrl}`);
    ajoutImage.setAttribute("alt", `${data.altTxt}`);
    ajout.appendChild(ajoutImage);

    // Ajout des options de choix de couleur
    const choixCouleur = document.getElementById("colors");
    for (let i = 0; i < data.colors.length; i++) {
      const ajoutChoixCouleur = document.createElement("option");
      ajoutChoixCouleur.innerHTML = `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
      choixCouleur.appendChild(ajoutChoixCouleur);
    }

    // Mise à jour du titre de la page avec le nom du produit
    document.title = `${data.name}`;
  });

// Gestion de l'ajout au panier
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", functionPanier);

function functionPanier() {
  const detailsProduit = {
    id: idItem,
    quantity: parseInt(document.getElementById("quantity").value),
    color: document.getElementById("colors").value,
  };

  // on vérifie si les informations sont complètes avant d'ajouter au panier
  if (detailsProduit.color === "") {
    alert("Sélectionnez une couleur pour l'ajouter au panier.");
  } else if (detailsProduit.quantity === 0) {
    alert("Sélectionnez au moins un article.");
  } else {
    let cart1 = JSON.parse(localStorage.getItem("panier")) || [];

    const articlePresent = cart1.find(
      (element) =>
        element.id === detailsProduit.id &&
        element.color === detailsProduit.color
    );

    if (articlePresent) {
      // mise à jour la quantité si l'article est déjà présent dans le panier
      articlePresent.quantity += parseInt(detailsProduit.quantity);
    } else {
      // Ajout du produit au panier si ce n'est pas déjà présent
      cart1.push(detailsProduit);
    }

    localStorage.setItem("panier", JSON.stringify(cart1));
  }
}
