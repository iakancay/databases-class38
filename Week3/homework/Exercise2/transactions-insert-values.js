import { execQuery } from "./transaction.js";

export const insertTablesQuery = [
  `INSERT INTO account (balance) VALUES
    (10000),
    (2000),
    (3000),
    (2500),
    (3600),
    (5000)`,
  `INSERT INTO account_changes (account_number,amount,remark) VALUES
    (2,100,'Money for bicycle'),
    (3,250,'For Rent'),
    (1,500,'For Holiday')`,
];

export const insertTables = (queries) => {
  queries.forEach(async (queryText) => {
    await execQuery(queryText);
  });
};
