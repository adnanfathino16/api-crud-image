import db from "../models/index.js";
const User = db.users;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const daftarUser = async (req, res) => {
  const { username, email, password } = req.body;

  const usernameUser = await User.findOne({ username: username });
  const emailUser = await User.findOne({ email: email });

  if (usernameUser) {
    return res.status(404).send({
      status: false,
      message: "Username sudah terdaftar",
    });
  }

  if (emailUser) {
    return res.status(404).send({
      status: false,
      message: "Email sudah terdaftar",
    });
  }

  const hashPw = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    email: email,
    password: hashPw,
  });

  await user.save();

  res.status(200).send({
    status: true,
    message: "user behasil didaftarkan",
  });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const usernameoremail = username;

  const dataUser = await User.findOne({
    $or: [{ username: usernameoremail }, { email: usernameoremail }],
  });
  if (dataUser) {
    const passwordUser = await bcrypt.compare(password, dataUser.password);
    if (passwordUser) {
      const userId = {
        id: dataUser._id,
      };
      const token = jwt.sign(userId, process.env.JWT_SECRET);
      return res.status(200).send({
        message: "Berhasil Login",
        token: token,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "username atau password salah",
      });
    }
  } else {
    return res.status(404).send({
      status: false,
      message: "username atau password salah",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findOne({ _id: id });
    res.status(200).send({
      status: true,
      data: user,
    });
  } catch (error) {
    res.send({ error: error });
  }
};
