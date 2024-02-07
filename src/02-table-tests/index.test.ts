import {  simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 44, b: 18, action: Action.Add, expected: 62 },
  { a: 1001, b: 557, action: Action.Subtract, expected: 444 },
  { a: 78, b: 15, action: Action.Subtract, expected: 63 },
  { a: 11, b: 3, action: Action.Multiply, expected: 33 },
  { a: 9, b: 34, action: Action.Multiply, expected: 306 },
  { a: 77, b: 11, action: Action.Divide, expected: 7 },
  { a: 369, b: 123, action: Action.Divide, expected: 3 },
  { a: 2, b: 8, action: Action.Exponentiate, expected: 256 },
  { a: 11, b: 2, action: Action.Exponentiate, expected: 121 },
  { a: 3, b: 2, action: '!', expected: null },
  { a: 3, b: 'test', action: Action.Exponentiate, expected: null }
];

describe('simpleCalculator', () => {
  it.each(testCases)('calculator variants', ({a, b, action, expected}) => {
    const res = simpleCalculator({
      a, b, action
    });

    expect(res).toBe(expected);
  });
});
