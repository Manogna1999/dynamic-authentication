import { MongoClient } from "mongodb";

const url = "mongodb://admin:password@127.0.0.1:27017";
const dbName = "test";

const client = new MongoClient(url, { useNewUrlParser: true });

export default async function () {
  await client.connect();
  return client.db(dbName);
}
