//Recuperation de l'élément du DOM

const cartItem = document.getElementById("cart__items");

// Récupération du panier dans le localstorage 
let panier1 = JSON.parse(localStorage.getItem('panier'));

console.log(panier1)



for (i = 0; i < panier1.length; i++) {
  cartItem.innerHTML += `   <article class="cart__item" data-id="${panier1[i].id}" data-color="${panier1[i].color}">
      <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>Nom du produit</h2>
          <p>${panier1[i].color}</p>
          <p>42,00 €</p>
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