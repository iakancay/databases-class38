import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { transferMoney } from "./transfer.js";
import { createAccount } from "./setup.js";
dotenv.config();

const client = new MongoClient(process.env.URI);
export const accountsCollection = client
  .db("databaseWeek4")
  .collection("accounts");

const main = async () => {
  client.connect();
  try {
    await createAccount(101, 5000);
    await createAccount(102, 3500);
    await transferMoney(client, 101, 102, 1000, "Birthday Gift");
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};

main().catch((err) => console.log(err));
