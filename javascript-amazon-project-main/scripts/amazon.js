import { cart, addcart,calculateCartQuantity } from "../data/cart.js";
import { products, loadProducts, loadProductsFetch } from "../data/products.js";
import { formatCurreny } from "./utils/money.js";

// import {updateCartQuantity} from "../checkout/orderSummary.js"

loadProductsFetch().then(renderProductsGrid)

// loadProducts(renderProductsGrid) 

// we can pass renderProductsGrid as callback function to loadProducts because loadProducts is an asynchronous function and we need to wait for it to finish before rendering the products grid. otherwise, we will try to render the products grid before the products have loaded, and we will get an error because the products are not available yet. by using a callback function, we can ensure that we only try to render the products grid after the products have loaded successfully. if there is an error loading the products, we can catch that error and handle it appropriately.


function renderProductsGrid(){


let ProductsHtml = ""; // accumulator pattern

products.forEach((product) => {
  ProductsHtml += `
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
              src="${product.getStarsUrl()}" alt="Rating: 4.5 out of 5 stars"> </img>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}" aria-label="Quantity">
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

          ${product.extraInfoHTML()}  

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" alt="Checkmark">
            Added</img>
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"   data-product-id=
          "${product.id}">
            Add to Cart
          </button>
        </div>`;
});

// data-product-name it's data attribute for it's represent which button we clicked and we know product details that's reason we add data attribute

document.querySelector(".js-products-grid").innerHTML = ProductsHtml;


function updateQuantityCart(){
   let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    // updateCartQuantity() // update cart quantity in header after adding item to cart
}


 function updateCartQuantity() {
let cartQuantity= calculateCartQuantity() // calculate total quantity of items in cart  ;


document.querySelector(".js-cart-quantity").textContent = cartQuantity

}
updateCartQuantity()


document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
   
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );

    const quantity = Number(quantitySelector.value);

    console.log(quantity);

    addcart(productId, quantity); // add product to cart with specific quantity
    
    console.log(cart)

    // now we can add quantity and display in cart section

   updateQuantityCart()

  });
});

}

