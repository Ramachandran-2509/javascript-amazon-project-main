import {renderorderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import {loadCart} from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/cart-oop.js';
import '../data/backend-pratice.js';


async function loadPage(){

  try{
    
    // throw 'error1'  
    // these all manual errors are for testing the error handling of loadPage function. we can uncomment these lines one by one to see how the error handling works. when we throw an error, it will be caught by the catch block, and we will log the error message to the console. this will help us identify if there is an issue with loading the products or cart, and we can take appropriate action to fix the issue.

    await loadProductsFetch();

    await loadCart();
  }
  catch(error){
    console.log("error loading products or cart", error)
  }
  

  // await new Promise((resolve) => {
  //   loadCart(() => {
  //     resolve();
  //   });
  // })

  renderorderSummary();
  renderPaymentSummary();
}

loadPage();

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   })

// ]).then(()=>{
//   renderorderSummary();
//   renderPaymentSummary();
// })

// promise are a way to handle asynchronous operations in JavaScript. They represent a value that may not be available yet, but will be resolved at some point in the future. A promise can be in one of three states: pending, fulfilled, or rejected. When a promise is fulfilled, it means that the asynchronous operation has completed successfully and the promise has a value. When a promise is rejected, it means that the asynchronous operation has failed and the promise has a reason for the failure. Promises allow us to write cleaner and more readable code when dealing with asynchronous operations, as they provide a way to handle success and failure cases without having to use nested callbacks.

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   })
// }).then(()=>{
//   return new Promise((resolve) => {
//   loadCart(()=>{
//     resolve();
//   })
// })
// }).then(() => {
//   renderorderSummary();
//   renderPaymentSummary();
// })

// loadProducts is an asynchronous function. We need to wait for it to finish before rendering the order summary and payment summary. Otherwise, we will try to render the order summary and payment summary before the products have loaded, and we will get an error because the products are not available yet. By using a promise, we can ensure that we only try to render the order summary and payment summary after the products have loaded successfully. If there is an error loading the products, we can catch that error and handle it appropriately.


// loadProducts(()=>{
//   renderorderSummary()
//   renderPaymentSummary()
// })
