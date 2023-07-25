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

      let getName = data[getIndex].name;
      let getPrix = data[getIndex].price;

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

      document.querySelectorAll(`.quantity${[a]}`).forEach((deleteItem) =>
        deleteItem.addEventListener("change", function () {
          const selectInput = document.querySelectorAll(`.quantity${[a]}`);
          const updatedInput = selectInput[0].value;

          let articles = JSON.parse(localStorage.getItem("panier"));
          articles[a].quantity = Number(updatedInput);
          localStorage.setItem("panier", JSON.stringify(articles));

          //  localStorage.setItem("panier", JSON.stringify(articles.quantity));
        })
      );
    }
  });

function getPanier() {
  let articles = [];
  if (localStorage.getItem("panier") != null) {
    articles = JSON.parse(localStorage.getItem("panier"));
  }
  return articles;
}

function deleteArticle(a) {
  let articles = JSON.parse(localStorage.getItem("panier"));
  articles.splice(a, 1);
  localStorage.setItem("panier", JSON.stringify(articles));
  window.location.reload();
}

function updateValue() {}

/// TEST CORRECTION AJOUT

///////////////////////////////////////

///////////////////////////////////////////
// function getPanier() {
//   let articles = [];
//   if (localStorage.getItem("panier") != null) {
//     articles = JSON.parse(localStorage.getItem("panier"));
//   }
//   console.log(articles)
//   return articles;
// }

// getPanier()

// console.log(articles)

// fonction pour supprimer les articles du localstorage
// function deleteArticle(id, color) {
//   let article = getPanier();
//   let index = article.indexOf();

//   console.log(index);

//   for (i = 0; i < article.length; i++) {
//     if (id === article[i][0] && color === article[i][1]) {
//       //   article.splice(i, 1);
//       //   localStorage.setItem("panier", JSON.stringify(article));
//       //   window.location.reload();

//       let array2 = panier1.indexOf(article[i].id);
//       console.log(array2);
//     }
//   }
// }
//   });
