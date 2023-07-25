//Recuperation de l'élément du DOM

const cartItem = document.getElementById("cart__items");

// Récupération du panier dans le localstorage
let panier1 = JSON.parse(localStorage.getItem("panier"));
//Implémentation des articles dans le panier avec une boucle basée sur panier1

//Les éléments présents dans le localstorage sont utilisés, les autres sont récupérés avec fetch
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    for (i = 0; i < panier1.length; i++) {
      //récupération des objets dans le panier, et des informations correspondantes dans l'api (nom, imageUrl...)
      let getId = panier1[i].id;
      let getIndex = data.findIndex((item) => item._id === getId);

      cartItem.innerHTML += `   <article class="cart__item" data-id="${
        panier1[i].id
      }" data-color="${panier1[i].color}">
          <div class="cart__item__img">
            <img src="${
              data[getIndex].imageUrl
            }" alt="Photographie d'un canapé">
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
                <input type="number" class="itemQuantity quantity${[
                  i,
                ]}" name="itemQuantity" min="1" max="100" value="${
        panier1[i].quantity
      }">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem index${[i]}">Supprimer</p>
              </div>
            </div>
          </div>
          </article>`;
    }

    // On accède au bouton supprimer correspondant à l'objet, selon l'index dans le localstorage
    for (let a = 0; a < panier1.length; a++) {
      document
        .querySelectorAll(`.index${[a]}`)
        .forEach((deleteItem) =>
          deleteItem.addEventListener("click", () => deleteArticle(a))
        );

      //on selectionne l'input number, puis avec un addeventlistener change, on modifie la quantité dans le localstorage
      document.querySelectorAll(`.quantity${[a]}`).forEach((deleteItem) =>
        deleteItem.addEventListener("change", function () {
          const selectInput = document.querySelectorAll(`.quantity${[a]}`);
          const updatedInput = selectInput[0].value;

          let articles = JSON.parse(localStorage.getItem("panier"));
          articles[a].quantity = Number(updatedInput);
          localStorage.setItem("panier", JSON.stringify(articles));
          window.location.reload();
        })
      );
    }
  });

//On  récupére le contenu du panier avec une fonction réutilisée plus tard

function getPanier() {
  let articles = [];
  if (localStorage.getItem("panier") != null) {
    articles = JSON.parse(localStorage.getItem("panier"));
  }
  return articles;
}

//fonction pour supprimer les articles dans le

function deleteArticle(a) {
  let articles = JSON.parse(localStorage.getItem("panier"));
  articles.splice(a, 1);
  localStorage.setItem("panier", JSON.stringify(articles));
  window.location.reload();
}

function updateValue() {}

// Gestion du total et du prix du panier

let totalQuantity = document.getElementById("totalQuantity");
let totalPrix = document.getElementById("totalPrice");

let qty = 0;

let price = 0;
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    for (let a = 0; a < panier1.length; a++) {
      let getId = panier1[a].id;
      let getIndex = data.findIndex((item) => item._id === getId);

      qty += panier1[a].quantity;
      totalQuantity.textContent = qty;

      price += data[getIndex].price * panier1[a].quantity;

      console.log(price);
      totalPrix.textContent = price;
    }
  });

/// Formulaire de confirmation
let prenom = document.getElementById("firstName");
let nom = document.getElementById("lastName");
let ville = document.getElementById("city");
let adresse = document.getElementById("address");
let email = document.getElementById("email");


// regex pour s'assurer que les infos rentrées sont compatibles avec les inputs

