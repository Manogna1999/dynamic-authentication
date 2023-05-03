// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import middleware from "./middleware";
async function handler(req, res) {
  const isAuthorized = await middleware(req, res);
  if (!isAuthorized) {
    return res.status(401).json({ error: "Please login to continue" });
  }
  res.status(200).json({
    name: "John Doe",
  });
}

module.exports = handler;
