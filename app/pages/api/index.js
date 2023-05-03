import mongoClient from "../../lib/mongo";

export default async (req, res) => {
  const db = await mongoClient();
  const collection = db.collection("users");
  const users = await collection.find({}).toArray();
  res.json(users);
};
