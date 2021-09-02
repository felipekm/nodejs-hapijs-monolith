const { format } = require('../currency-helper');

test('should format the value 256.12', () => {
  const value = 256.12;
  const assert = 'R$ 256,12';

  const formatted = format(value);

  return expect(formatted).toEqual(assert);
});

test('should format the value 11714', () => {
  const value = 11714;
  const assert = 'R$ 11.714,00';

  const formatted = format(value);

  return expect(formatted).toEqual(assert);
});