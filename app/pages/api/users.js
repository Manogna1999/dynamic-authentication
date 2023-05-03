import mongoClient from "../../lib/mongo";
const { ObjectId } = require("mongodb");
import speakeasy from "speakeasy";
import bcrypt from "bcrypt";
const { authenticator } = require("otplib");
const QRCode = require("qrcode");

export default async (req, res) => {
  if (req.method === "GET") {
    const db = await mongoClient();
    const users = await db.collection("users").find({}).toArray();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    /* firstName, lastName, email, password */
    const { firstName, lastName, email, password, client_id } = req.body;

    const secret = authenticator.generateSecret();

    const db = await mongoClient();

    QRCode.toDataURL(
      authenticator.keyuri(email, "Dynamic Authenticator", secret),
      async (err, url) => {
        const user = await db.collection("users").insertOne({
          firstName,
          lastName,
          email,
          password,
          qrCode: url,
          secret: secret,
          client_id: new ObjectId(client_id),
        });
        return res.status(200).json({
          message: "User created successfully",
        });
      }
    );
  }
};
