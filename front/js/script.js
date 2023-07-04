
//initialisation
//variables de base
const localhost = "http://localhost:3000/api/products";

const box = document.getElementById("items");




fetch('http://localhost:3000/api/products')
.then(response => response.json())
.then(data => {console.log(data)
  for(i = 0; i < data.length; i++){
  
    box.innerHTML += `<a href="./product.html?id=42">
     <article>
       <img src="${data[i].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${data[i].name} </h3>
      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
     </article>`;
      

     
    }});  


    

 