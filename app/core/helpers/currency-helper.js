const currency = require('currency.js');

const symbol = 'R$ ';

/**
 * @function format
 * @description Formats the float value to the BRL currency
 * @param  {Float} cash Value to convert to the BRL currency
 * @return {String} Currency formatted
 */
module.exports.format = cash => {
  cash = parseFloat(cash);

  if (isNaN(cash) || cash === 0) {
    return `${symbol}0,00`;
  }

  return currency(cash, {
    symbol,
    decimal: ',',
    separator: '.',
    precision: 2,
    formatWithSymbol: true
  }).format(true);
};