import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
        email,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "Create user successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const age = 1000 * 60 * 60 * 24 * 7;
    const { password: userPassword, ...userInfo } = user;
    const token = jwt.sign(
      {
        id: user.id,
      },
      // process.env.JWT_SECRET,
      "lah",
      {
        expiresIn: age,
      }
    );
    res
      .cookie("token", token, {
        // httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successfully" });
};
