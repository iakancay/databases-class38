import { accountsCollection } from "./index.js";

export const createAccount = async (account_number, balance) => {
  const newAccount = {
    account_number: account_number,
    balance: balance,
    account_changes: [],
  };

  const result = await accountsCollection.insertOne(newAccount);
  console.log(`Account added with the id ${result.insertedId}`);
};
