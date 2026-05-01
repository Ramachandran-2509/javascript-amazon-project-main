export function formatCurreny(priceCents){
  return (Math.round(priceCents)/100).toFixed(2)
  
}

console.log(formatCurreny(12500000.00))



// function formatCurrency(priceCents, currency = 'USD', locale = 'en-US') {
//   return new Intl.NumberFormat(locale, {
//     style: 'currency',
//     currency: currency
//   }).format(priceCents / 100);
// }

// console.log(formatCurrency(125000)); // $3.00
// console.log(formatCurrency(300, 'INR', 'en-IN')); // ₹3.00