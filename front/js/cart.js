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
      cartItem.innerHTML += `   <article class="cart__item" data-id="${panier1[i].id}" data-color="${panier1[i].color}">
          <div class="cart__item__img">
            <img src="${data[i].imageUrl}" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data[i].name} </h2>
              <p>${data[i].price}€</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier1[i].quantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
    }
  });


