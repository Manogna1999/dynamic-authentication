import jwt from "jsonwebtoken";
import mongoClient from "../../../lib/mongo";
const { ObjectId } = require("mongodb");
const SECRET_KEY = "secret";
import { NextResponse } from "next/server";

const middlware = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret");

    const db = await mongoClient();
    const tokenExists = await db.collection("tokens").findOne({
      token: token,
      device: req.headers["user-agent"],
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    });

    if (!tokenExists) {
      throw new Error("Token not found");
    }

    return true;
  } catch (error) {
    return false;
  }
  return NextResponse.next();
};

export default middlware;
