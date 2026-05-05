import {formatCurreny} from '../scripts/utils/money.js';


describe('test suite: formatCurrency', () => {

  it('convert cents to dollars and round to 2 decimal places', () => {
    expect(formatCurreny(2095)).toEqual('20.95');
  }); 

  it('convert to 0.00 when price is 0', () => {
    expect(formatCurreny(0)).toBe('0.00');
  });

  it('rounds up to nearest cent', () => {
    expect(formatCurreny(2000.5)).toBe('20.01');
    expect(formatCurreny(2000.4)).toBe('20.00');
  });

});