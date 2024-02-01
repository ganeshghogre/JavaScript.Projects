function LoadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(response){
     return response.json();
    })
    .then(function(categories){
     categories.unshift("all");
     for(var category of categories){
         var option = document.createElement("option");
         option.text = category.toUpperCase();
         option.value = category;
         document.getElementById("lstCategories").appendChild(option);
      }
    })
 }
 function LoadProducts(url){
     document.querySelector("main").innerHTML="";
     fetch(url)
     .then(function(response){
         return response.json();
     })
     .then(function(products){
         for(var product of products){
             var card = document.createElement("div");
             card.className = "card p-2 m-2";
             card.style.width ="200px";
             card.innerHTML =`
                <img src=${product.image} class="card-img-top" height="100">
                <div class="card-header overflow-auto" style="height:80px">
                 <p>${product.title}</p>
                 </div>
                 <div class="card-body">
                     <dl>
                         <dt>Price</dt>
                         <dd>${product.price}</dd>
                         <dt>Rating</dt>
                         <dd>
                             <span class="bi bi-star-fill text-success"> </span>
                             ${product.rating.rate}[${product.rating.count}]
                             </dd>
                         </dl>
                         </div>
                         <div class="card-footer">
                             <button onclick= "AddToCartClick(${product.id})" class="btn btn-danger w-100">
                                 <span class="bi bi-cart4"></span> Add to Cart
                                 </button>
                             </div>
                             `;
                             document.querySelector("main").appendChild(card);
         }
     })
 }

 function bodyload(){
     LoadCategories();
     LoadProducts("https://fakestoreapi.com/products");
     GetCartCount();
 }
 function categoryChanged(){
     var categoryName = document.getElementById("lstCategories").value;
     if(categoryName=="all"){
         LoadProducts("https://fakestoreapi.com/products");
     }else {
         LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
        }
 }
 function NavClick(categoryName){
     document.getElementById("lstCategories").value = categoryName;
     if(categoryName=="all"){
         LoadProducts("https://fakestoreapi.com/products");
     }else {
         LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
        }
 }
 var cartItems = [];
 function GetCartCount(){
     document.getElementById("cartCount").innerHTML = cartItems.length;

 }
 function AddToCartClick(id){
     fetch(`http://fakestoreapi.com/products/${id}`)
     .then(function(response){
         return response.json();
     })
     .then(function(product){
         alert(`${product.title}\nAdded to cart`);
         cartItems.push(product);
         GetCartCount();
})
    }
    function LoadCartItems(){
     document.querySelector("tbody").innerHTML = "";
     for(var item of cartItems){
         var tr = document.createElement("tr");
         var tdTitle = document.createElement("td");
         var tdImage  = document.createElement("td");
         var tdPrice  = document.createElement("td");

         tdTitle.innerHTML = item.title;
         tdImage.innerHTML = `<img src=${item.image} width="50" height="50">`;
         tdPrice.innerHTML = item.price;

         tr.appendChild(tdTitle);
         tr.appendChild(tdImage);
         tr.appendChild(tdPrice);

         document.querySelector("tbody").appendChild(tr);
     }
    }