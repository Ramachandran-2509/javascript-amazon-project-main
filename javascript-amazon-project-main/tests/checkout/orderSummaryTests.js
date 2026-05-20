import { renderorderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";


describe("test suite: renderorderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

/// loadProducts is an asynchronous function. We need to wait for it to finish before running our tests. Otherwise, our tests will run before the products have loaded, and they will fail because they rely on the products being loaded. so we use beforeAll to wait for loadProducts to finish before running our tests. and we call done() to tell Jest that the asynchronous operation is complete and it can proceed with running the tests.

  beforeAll((done) =>{
    loadProductsFetch().then(()=>{
      done();
    });
  });


  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-orderSummary"></div>
      <div class="js-return-to-home-link"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();

    renderorderSummary();
  });

// test 1

  it("display the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(2)

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText,
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText,
    ).toContain("Quantity: 1");

   
  });

// test 2

  it("Removes a poduct", () => {
    document.querySelector(".js-delete-link").click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1,
    );

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`),
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`),
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

   
  });

  afterEach(() => { 

     document.querySelector(".js-test-container").innerHTML = "";

  });
});

