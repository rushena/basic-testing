import {simpleCalculator} from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const res = simpleCalculator({
      a: 4,
      b: 3,
      action: '+'
    });

    expect(res).toBe(7);
  });

  test('should subtract two numbers', () => {
    const res = simpleCalculator({
      a: 55,
      b: 18,
      action: '-'
    })

    expect(res).toBe(37);
  });

  test('should multiply two numbers', () => {
    const res = simpleCalculator({
      a: 11,
      b: 48,
      action: '*'
    });

    expect(res).toBe(528);
  });

  test('should divide two numbers', () => {
    const res = simpleCalculator({
      a: 255,
      b: 5,
      action: '/'
    });

    expect(res).toBe(51);
  });

  test('should exponentiate two numbers', () => {
    const res = simpleCalculator({
      a: 2,
      b: 8,
      action: '^'
    });
    expect(res).toBe(256);
  });

  test('should return null for invalid action', () => {
    const res = simpleCalculator({
      a: 2,
      b: 8,
      action: '!'
    });

    expect(res).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const res = simpleCalculator({
      a: 2,
      b: 'bb',
      action: '^'
    });

    expect(res).toBeNull();
  });
});
