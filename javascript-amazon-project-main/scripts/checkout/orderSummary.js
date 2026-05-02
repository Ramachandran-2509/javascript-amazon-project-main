import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  calculateCartQuantity,
  updateQuantity,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurreny } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";

import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";

// let k= dayjs()
// const res= k.add(7, 'days')

// console.log(res.format('dddd, MMMM D'))

export function renderorderSummary() {
  let orderSummaryHtml = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const MatchingProduct = getProduct(productId);

    const deliveryOptionID = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionID);

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
                    Quantity: <span class="quantity-label js-quantity-label-${MatchingProduct.id}">${cartItem.quantity}</span>
                  </span>

                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${MatchingProduct.id}">
                    Update
                  </span>

                  <input class="quantity-input js-quantity-input-${MatchingProduct.id}" type="number" min="0" max="999" value="${cartItem.quantity}">
            <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${MatchingProduct.id}">
              Save
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
      updateCartQuantity(); // update cart quantity in header after removing item from cart
      renderPaymentSummary(); // re-render payment summary after removing item from cart
    });
  });

  function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();

    document.querySelector(".js-return-to-home-link").textContent =
      `${cartQuantity} items`;
  }
  updateCartQuantity();


  // update quantity in order summary and payment summary when we click on update link
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      console.log(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');

    });
  });


  document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`
      // );
      // container.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      
      const newQuantity = Number(quantityInput.value);
      console.log(newQuantity)

        if (newQuantity <= 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }

      updateQuantity(productId, newQuantity);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.classList.remove('is-editing-quantity');

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();

    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderorderSummary(); // this will re-render the order summary with the updated delivery option
      renderPaymentSummary(); // this will re-render the payment summary with the updated delivery option
    });
  });
}
