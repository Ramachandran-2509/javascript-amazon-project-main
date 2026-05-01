import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurreny } from "../scripts/utils/money.js";

import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

// let k= dayjs()
// const res= k.add(7, 'days')

// console.log(res.format('dddd, MMMM D'))

let orderSummaryHtml = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let MatchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      MatchingProduct = product;
    }
  });

  
  const deliveryOptionID = cartItem.deliveryOptionId;
    console.log(deliveryOptionID)
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionID) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "day");

  const dateString = deliveryDate.format("dddd, MMMM D");

  orderSummaryHtml += `
  
  <div class="cart-item-container 
  js-cart-item-container-${MatchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${MatchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
              ${MatchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurreny(MatchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${MatchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                     
                ${deliveryOptionsHTML(MatchingProduct, cartItem)}
                  
                
              </div>
            </div>
          </div>
  
  
  `;
});

function deliveryOptionsHTML(MatchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "day");

    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceCents =
      deliveryOption.priceCents === 0
        ? "Free "
        : `${formatCurreny(deliveryOption.priceCents)} -`;

    // select default option need to be selected once page loaded
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
   

    html += ` <div class="delivery-option js-delivery-option"
      data-product-id = "${MatchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}"
    >
                    <input type="radio"
                      ${isChecked ? "checked" : " "}
                      class="delivery-option-input"
                      name="delivery-option-${MatchingProduct.id}">

                    <div>
                      <div class="delivery-option-date">
                      ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        $${priceCents}Shipping
                      </div>
                    </div>
                  </div>
      
      `;
  });

  return html;
}

// console.log(orderSummaryHtml)
document.querySelector(".js-orderSummary").innerHTML = orderSummaryHtml;
// console.log(orderSummaryHtml)

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    removeFromCart(productId); // remove product from cart
    // console.log(cart)

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
