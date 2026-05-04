import {formatCurreny} from '../scripts/utils/money.js';

console.log('test suite: formatCurrency')

console.log('convert cents to dollars and round to 2 decimal places')

if(formatCurreny(2095) === '20.95') {
  console.log('test passed');
}else{
  console.log('test failed')
}

console.log('convert to 0.00 when price is 0')

if(formatCurreny(0) === '0.00') {
  console.log('test passed');
}else{
  console.log('test failed')
}

console.log('rounds up to nearest cent')

if(formatCurreny(2000.5) === '20.01') {
  console.log('test passed');
}else{
  console.log('test failed')
} 

if(formatCurreny(2000.4) === '20.00 ') {
  console.log('test passed');
}else{
  console.log('test failed')
} 