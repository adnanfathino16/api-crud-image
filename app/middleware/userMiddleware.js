import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({
      message: "Tidak ada token",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.id = decode.id;
  next();
};
