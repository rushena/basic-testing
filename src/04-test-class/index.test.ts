import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';
import { jest } from '@jest/globals';

let initialBalance = 100;
const account: BankAccount = getBankAccount(initialBalance);
const initialBalanceAcc2 = 200;
const account2: BankAccount = getBankAccount(initialBalanceAcc2);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(initialBalance + 10)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(initialBalance + 10, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(initialBalance, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depositValue = 50;
    initialBalance += depositValue;
    account.deposit(depositValue);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should withdraw money', () => {
    const withdrawValue = 100;
    initialBalance -= withdrawValue;
    account.withdraw(withdrawValue);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should transfer money', () => {
    const transferValue = 10;
    initialBalance -= transferValue;
    account.transfer(transferValue, account2);
    expect(account.getBalance()).toBe(initialBalance);
    expect(account2.getBalance()).toBe(initialBalanceAcc2 + transferValue);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const value = 50;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(value)
      .mockReturnValueOnce(1);
    const res = await account.fetchBalance();
    expect(res).toBe(value);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const value = 500;
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(value);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(value);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
