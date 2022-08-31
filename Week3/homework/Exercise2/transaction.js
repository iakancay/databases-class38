import mysql from "mysql";
import util from "util";
import {
  createTables,
  createTablesQuery,
} from "./transactions-create-tables.js";
import {
  insertTables,
  insertTablesQuery,
} from "./transactions-insert-values.js";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});
export const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery("CREATE DATABASE IF NOT EXISTS TransactionDB");
    await execQuery("USE TransactionDB");
    await createTables(createTablesQuery);
    await insertTables(insertTablesQuery);

    await execQuery("START TRANSACTION");

    await execQuery(
      "UPDATE account SET balance = balance-1000 WHERE account_number = 1"
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount,remark) VALUES (1,1000,'Hyf donate to Account2')`
    );
    await execQuery(
      "UPDATE account SET balance = balance+1000 WHERE account_number = 2"
    );
    await execQuery(
      `INSERT INTO account_changes (account_number,amount,remark) VALUES (2,1000,'Hyf donate from Account1')`
    );

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
