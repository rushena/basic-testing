import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import {jest} from '@jest/globals';

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn)
  };
});

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const todosPath = 'todos';
  const response = {
    data: 'Success response'
  };

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(async () => Promise.resolve(response)),
    });
  })

  test('should create instance with provided base url', async () => {

    await (throttledGetDataFromApi as Function)(todosPath);

    expect(axios.create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
  });

  test('should perform request to correct provided url', async () => {

    await (throttledGetDataFromApi as Function)(todosPath);

    expect(axios.create().get).toBeCalledWith(todosPath);
  });

  test('should return response data', async () => {
    const res = await (throttledGetDataFromApi as Function)(todosPath);
    expect(res).toBe(response.data);
  });
});
