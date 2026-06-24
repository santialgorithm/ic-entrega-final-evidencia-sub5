const suma = require('./app');

test('suma correctamente', () => {
  expect(suma(2,3)).toBe(5);
});