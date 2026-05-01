import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurreny } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js";

export function renderPaymentSummary(){

  let  productPriceCents = 0
  let shippingPriceCents = 0

  
  
  cart.forEach((cartItem)=>{
    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption= getDeliveryOption(cartItem.deliveryOptionId)
    shippingPriceCents += deliveryOption.priceCents

    

    
  })
  let result = formatCurreny(productPriceCents)
  let shippingCost = formatCurreny(shippingPriceCents)

  const totalBeforeTaxCents = formatCurreny(productPriceCents + shippingPriceCents)

  const taxCents = formatCurreny((productPriceCents + shippingPriceCents) * 0.1)

  const totalCents = formatCurreny(productPriceCents + shippingPriceCents + (productPriceCents + shippingPriceCents) * 0.1)

  // console.log(result)
  // console.log(shippingCost)
  // console.log(totalBeforeTaxCents)
  // console.log(taxCents)
  // console.log(totalCents)

  const paymentSummaryHtml = 
      `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${result}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${shippingCost}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTaxCents}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxCents}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalCents}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHtml;
}
