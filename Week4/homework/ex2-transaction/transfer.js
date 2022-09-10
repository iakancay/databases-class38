import { accountsCollection } from "./index.js";

export const transferMoney = async (
  client,
  fromAccountNumber,
  toAccountNumber,
  amount,
  remark
) => {
  const fromAccountChange = await createTransferDetailDocument(
    fromAccountNumber,
    amount * -1,
    remark
  );
  const toAccountChange = await createTransferDetailDocument(
    toAccountNumber,
    amount,
    remark
  );

  const session = await client.startSession();
  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };
  try {
    await session.withTransaction(async () => {
      await accountsCollection.updateOne(
        { account_number: fromAccountNumber },
        {
          $inc: { balance: amount * -1 },
          $push: { account_changes: fromAccountChange },
        },
        { session }
      );
      await accountsCollection.updateOne(
        { account_number: toAccountNumber },
        {
          $inc: { balance: amount },
          $push: { account_changes: toAccountChange },
        },
        { session }
      );
    }, transactionOptions);
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
  } finally {
    await session.endSession();
  }
};

const createTransferDetailDocument = async (account_number, amount, remark) => {
  const account = await accountsCollection.findOne({
    account_number: account_number,
  });

  const numberOfChanges = account["account_changes"].length;
  let account_change = {
    change_number: numberOfChanges + 1,
    amount: amount,
    changed_date: new Date(),
    remark: remark,
  };
  return account_change;
};
