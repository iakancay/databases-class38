import { execQuery } from "./transaction.js";

export const createTablesQuery = [
  `CREATE TABLE IF NOT EXISTS account(
        account_number INT PRIMARY KEY AUTO_INCREMENT,
        balance INT
    )`,
  `CREATE TABLE IF NOT EXISTS account_changes(
        change_number INT PRIMARY KEY AUTO_INCREMENT,
        account_number INT,
        amount INT,
        changed_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        remark TEXT,
        FOREIGN KEY(account_number) REFERENCES account(account_number)
    )
    `,
];

export const createTables = (queries) => {
  queries.forEach(async (queryText) => {
    await execQuery(queryText);
  });
};
