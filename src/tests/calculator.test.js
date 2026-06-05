const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow('Division by zero');
  });

  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(1, 0)).toThrow('Modulo by zero');
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(2, 10)).toBe(1024);
  });

  test('square root: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('square root of negative number throws', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of negative number');
  });

  test('works with negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
    expect(subtract(-5, -5)).toBe(0);
    expect(multiply(-4, 3)).toBe(-12);
    expect(divide(-10, 2)).toBe(-5);
  });

  test('works with floats', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
    expect(divide(1, 3)).toBeCloseTo(0.333333, 5);
  });
});
