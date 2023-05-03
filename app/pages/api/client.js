import mongoClient from "../../lib/mongo";

export default async (req, res) => {
  if (req.method === "GET") {
    const db = await mongoClient();
    const clients = await db.collection("clients").find().toArray();
    res.status(200).json(clients);
  } else if (req.method === "POST") {
    const { name, description, host } = req.body;
    const db = await mongoClient();
    const client = await db.collection("clients").insertOne({
      name,
      description,
      host,
      createdAt: new Date(),
    });
    res.status(200).json(client);
  }
};
