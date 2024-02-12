import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const simpleArr = [1];
    const res = generateLinkedList(simpleArr);

    expect(res).toStrictEqual({
      value: 1,
      next: {
        value: null,
        next: null,
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const arr = [1, 2, 3, 'a', 'b', 'c'];
    const res = generateLinkedList(arr);
    expect(res).toMatchSnapshot();
  });
});
