import {  Balance, Transaction } from "../types";


/**
 *  収支のサマリーを作成
 * @param transactions 収支情報の配列
 * @returns  収支サマリー
 */
export const financeCalculation = (transactions: Transaction[]): Balance => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      acc.balance = acc.income - acc.expense;
      return acc;

      // 初期値
    },
    { income: 0, expense: 0, balance: 0 }
  );
};

// 1.日付ごとの収支を計算する関数
export const calculateDailyBalances = (
  transactions: Transaction[]
): Record<string, Balance> => {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 };
    }

    if(transaction.type === "income") {
        acc[day].income += transaction.amount
    }else if(transaction.type === "expense") {
        acc[day].income  += transaction.amount
        
    }
        acc[day].balance = acc[day].income - acc[day].expense

    
    return acc;
  }, {});
};
