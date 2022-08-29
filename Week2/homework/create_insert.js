import mysql from "mysql";
import util from "util";
import {
  alterAuthorsTable,
  createAuthorsTable,
  createJunctionTable,
  createResearchPapersTable,
} from "./createTables.js";
import { fakeAuthors, fakePapers, junctionValues } from "./data.js";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

const execQuery = util.promisify(connection.query.bind(connection));

connection.connect();
//Database creating..
connection.query(
  "CREATE DATABASE IF NOT EXISTS researchers_db",
  (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Database created.");
  }
);
const seedDatabase = async () => {
  try {
    await execQuery("USE researchers_db");
    await execQuery(createAuthorsTable);
    await execQuery(createResearchPapersTable);
    await execQuery(createJunctionTable);
    await execQuery(alterAuthorsTable);
    await execQuery("SET FOREIGN_KEY_CHECKS=0");
    fakeAuthors.forEach(async (author) => {
      await execQuery("INSERT INTO authors SET ?", author);
    });
    await execQuery("SET FOREIGN_KEY_CHECKS=1");
    fakePapers.forEach(async (paper) => {
      await execQuery("INSERT INTO research_papers SET ?", paper);
    });
    junctionValues.forEach(async (value) => {
      await execQuery("INSERT INTO authors_papers SET ?", value);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
};
seedDatabase();
