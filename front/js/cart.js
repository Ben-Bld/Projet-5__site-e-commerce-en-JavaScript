///////////////////////////////////////

// Partie récupération des éléments

///////////////////////////////////////

const cartItem = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrix = document.getElementById("totalPrice");

// Fonction pour mettre à jour le contenu du panier
async function updateCartContent() {
  let panier1 = getPanier();
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();

  let cartContent = "";

  let qty = 0;
  let price = 0;

  for (let i = 0; i < panier1.length; i++) {
    const getIndex = data.findIndex((item) => item._id === panier1[i].id);

    qty += panier1[i].quantity;
    price += data[getIndex].price * panier1[i].quantity;

    cartContent += `
      <article class="cart__item" data-id="${panier1[i].id}" data-color="${panier1[i].color}">
        <div class="cart__item__img">
          <img src="${data[getIndex].imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${data[getIndex].name}</h2>
            <p>${panier1[i].color}</p>
            <p>${data[getIndex].price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity quantity${i}" name="itemQuantity" min="1" max="100" value="${panier1[i].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem index${i}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
  }

  cartItem.innerHTML = cartContent;
  totalQuantity.textContent = qty;
  totalPrix.textContent = price;
}

// EventListener pour changer la quantité
document.addEventListener("change", function (event) {
  if (event.target.classList.contains("itemQuantity")) {
    const index = parseInt(event.target.classList[1].replace("quantity", ""));
    const updatedInput = event.target.value;

    let articles = JSON.parse(localStorage.getItem("panier"));
    articles[index].quantity = Number(updatedInput);
    localStorage.setItem("panier", JSON.stringify(articles));

    // Mettre à jour le contenu du panier après la modification de la quantité
    updateCartContent();
  }
});

// EventListener pour supprimer un objet
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteItem")) {
    const index = parseInt(event.target.classList[1].replace("index", ""));
    let articles = JSON.parse(localStorage.getItem("panier"));
    articles.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(articles));

    // Mettre à jour le contenu du panier après la suppression
    updateCartContent();
  }
});

// Fonction pour récupérer le panier du localstorage
function getPanier() {
  let articles = [];
  if (localStorage.getItem("panier") !== null) {
    articles = JSON.parse(localStorage.getItem("panier"));
  }
  return articles;
}

// Mise à jour du panier actuel
updateCartContent();

///////////////////////////////////////

// Partie formulaire

///////////////////////////////////////

// Récupération des éléments du formulaire
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");

// Fonction pour valider le formulaire après confirmation
function validerFormulaire(event) {
  event.preventDefault(); // Empêcher la soumission du formulaire en cas de problème

  // Regex pour chaque input
  const nameRegex = /^[A-Za-z]+$/;
  const addressRegex = /^[A-Za-z0-9\s,'-]*$/;
  const cityRegex = /^[A-Za-z\s-]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fonction afficher un message d'erreur
  function afficherMessageErreur(inputElement, errorMsg) {
    const errorMsgElement = inputElement.nextElementSibling;
    errorMsgElement.textContent = errorMsg;
  }

  // Fonction effacer un message d'erreur
  function effacerMessageErreur(inputElement) {
    const errorMsgElement = inputElement.nextElementSibling;
    errorMsgElement.textContent = "";
  }

  // Valider prénom
  if (!nameRegex.test(firstNameInput.value)) {
    afficherMessageErreur(
      firstNameInput,
      "Le prénom doit contenir uniquement des lettres."
    );
    return;
  } else {
    effacerMessageErreur(firstNameInput);
  }

  // Valider nom de famille
  if (!nameRegex.test(lastNameInput.value)) {
    afficherMessageErreur(
      lastNameInput,
      "Le nom doit contenir uniquement des lettres."
    );
    return;
  } else {
    effacerMessageErreur(lastNameInput);
  }

  // Valider adresse
  if (!addressRegex.test(addressInput.value)) {
    afficherMessageErreur(addressInput, "L'adresse n'est pas valide.");
    return;
  } else {
    effacerMessageErreur(addressInput);
  }

  // balider ville
  if (!cityRegex.test(cityInput.value)) {
    afficherMessageErreur(cityInput, "Le nom de la ville n'est pas valide.");
    return;
  } else {
    effacerMessageErreur(cityInput);
  }

  // Valider email
  if (!emailRegex.test(emailInput.value)) {
    afficherMessageErreur(emailInput, "L'email n'est pas valide.");
    return;
  } else {
    effacerMessageErreur(emailInput);
  }

  // Si toutes les validations passent, on crée l'objet "confirmationPanier"
  const confirmationPanier = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    city: cityInput.value,
    email: emailInput.value,
  };

  // Récupération des id des produits du panier, dans le localStorage
  let idProducts = [];
  let panier1 = getPanier();
  for (let i = 0; i < panier1.length; i++) {
    idProducts.push(panier1[i].idProduct);
  }

  // Création de l'objet order
  const order = {
    contact: confirmationPanier,
    products: idProducts,
  };

  // Afficher l'objet order dans la console pour vérification
  console.log(order);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  };

  console.log(options);

  // Envoi des données Contac&t et l'id des produits à l'API
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      },
      products: idProducts,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
      console.log(data.orderId);
      // document.location.href = `confirmation.html?orderId=${data.orderId}`;
    })
    .catch((err) => {
      console.log("Erreur Fetch product.js", err);
      alert("Un problème a été rencontré lors de l'envoi du formulaire.");
    });

  // On vide le localStorage
  // localStorage.clear();
}

// Ajout de l'Eventlistener pour l'envoi du formulaire
const orderForm = document.querySelector(".cart__order__form");
orderForm.addEventListener("submit", validerFormulaire);
