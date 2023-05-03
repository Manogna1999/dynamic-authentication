import mongoClient from "../../../lib/mongo";
const { ObjectId } = require("mongodb");
const { authenticator } = require("otplib");
const jwt = require("jsonwebtoken");

const generateJWT = (email) => {
  const token = jwt.sign({ email }, "secret", {
    expiresIn: "1h",
  });
  return token;
};

const storeToken = async (_id, token, req) => {
  const db = await mongoClient();
  const user = await db.collection("tokens").insertOne({
    token: token,
    device: req.headers["user-agent"],
    ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  });
  return;
};

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password, token } = req.body;
    const db = await mongoClient();

    const user = await db
      .collection("users")
      .findOne({ email: email, password: password });
    if (user) {
      if (token.length > 0) {
        const isValid = authenticator.check(token, user.secret);
        if (!isValid) {
          return res.status(401).json({
            error: "Invalid token",
          });
        } else {
          const token = generateJWT(email);
          await storeToken(user._id, token, req);
          return res.json({
            token: token,
          });
        }
      }
      return res.json({
        multifactorEnabled: true,
      });
    } else {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
  }
};
