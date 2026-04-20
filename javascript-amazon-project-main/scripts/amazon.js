// we develop here generate html code and loop through our product display in html


// products came form data/product.js

let ProductsHtml ='';    // accumulator pattern

products.forEach((product)=>{

 ProductsHtml+=`
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}" alt="Black and Gray Athletic Cotton Socks - 6 Pairs"></img>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png" alt="Rating: 4.5 out of 5 stars"> </img>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents /100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select aria-label="Quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" alt="Checkmark">
            Added</img>
          </div>

          <button class="add-to-cart-button button-primary" type="button">
            Add to Cart
          </button>
        </div>`

       
})

 console.log(ProductsHtml)

 document.querySelector(".js-products-grid").innerHTML=ProductsHtml;



 //