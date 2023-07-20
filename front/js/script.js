//récupération des div "items"

const box = document.getElementById("items");

//fetch sur localhost, et conversion en json

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    // boucle pour implémenter les elements
    for (i = 0; i < data.length; i++) {
      box.innerHTML += `<a href="./product.html?id=${data[i]._id}">
     <article>
       <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
      <h3 class="productName">${data[i].name} </h3>
      <p class="productDescription">${data[i].description}</p>
     </article>`;
    }
  });


 