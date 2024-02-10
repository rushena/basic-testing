import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import {jest} from '@jest/globals';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  })

  test('should set timeout with provided callback and timeout', () => {
    const fn = jest.fn();
    doStuffByTimeout(fn, 100);
    expect(setTimeout).toBeCalledWith(fn, 100);
  });

  test('should call callback only after timeout', () => {
    const fn = jest.fn();
    doStuffByTimeout(fn, 300);
    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(300);
    expect(fn).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  })

  test('should set interval with provided callback and timeout', () => {
    const fn = jest.fn();
    doStuffByInterval(fn, 100);
    expect(setInterval).toBeCalledWith(fn, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fn = jest.fn();
    doStuffByInterval(fn, 300);
    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(300);
    expect(fn).toBeCalledTimes(1);
    jest.advanceTimersByTime(300);
    expect(fn).toBeCalledTimes(2);
    jest.advanceTimersByTime(300);
    expect(fn).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously',  () => {
  const filename = 'custom-filename.txt';

  test('should call join with pathToFile', async () => {
    const joinFn = jest.spyOn(path, 'join');
    await readFileAsynchronously(filename);
    expect(joinFn).toBeCalledWith(__dirname, filename);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const res = await readFileAsynchronously(filename);
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileBody: string = 'Hello NodeJS';
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValueOnce(fileBody);

    const res = await readFileAsynchronously(filename);
    expect(res).toBe(fileBody);
  });
});
