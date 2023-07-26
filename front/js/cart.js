//récupération des éléments

const cartItem = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrix = document.getElementById("totalPrice");

// fonction pour mettre à jour le contenu du panier
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

// eventlistener pour changer la quantité
document.addEventListener("change", function (event) {
  if (event.target.classList.contains("itemQuantity")) {
    const index = parseInt(event.target.classList[1].replace("quantity", ""));
    const updatedInput = event.target.value;

    let articles = JSON.parse(localStorage.getItem("panier"));
    articles[index].quantity = Number(updatedInput);
    localStorage.setItem("panier", JSON.stringify(articles));

    // Update the cart content after quantity change
    updateCartContent();
  }
});

// Eventlistener pour supprimer un objet
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteItem")) {
    const index = parseInt(event.target.classList[1].replace("index", ""));
    let articles = JSON.parse(localStorage.getItem("panier"));
    articles.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(articles));

    // on met à jour le panier après la suppression
    updateCartContent();
  }
});

// function ^pour récupérer le panier du localstorage
function getPanier() {
  let articles = [];
  if (localStorage.getItem("panier") != null) {
    articles = JSON.parse(localStorage.getItem("panier"));
  }
  return articles;
}

// mise à jour du panier actuel
updateCartContent();
