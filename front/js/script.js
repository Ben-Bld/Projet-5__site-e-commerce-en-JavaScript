// <!-- <a href="./product.html?id=42">
// <article>
//   <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//   <h3 class="productName">Kanap name1</h3>
//   <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
// </article> -->

const localhost = "http://localhost:3000/api/products";

const box = document.getElementById("items");

let card = document.createElement("div");

box.append(card);

box.innerHTML += `<a href="./product.html?id=42">
 <article>
   <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
  <h3 class="productName">Kanap name1</h3>
  <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
 </article>`;
