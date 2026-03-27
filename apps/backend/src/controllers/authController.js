import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  //check if user exists
  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (userExists) {
    return res
      .status(400)
      .json({ status: "error", error: "User already exists with this email" });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // generate JWT Token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //check if user email exists in the table
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return res
      .status(401)
      .json({ status: "error", error: "Invalid email or password" });
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ status: "error", error: "Invalid email or password" });
  }

  // generate JWT Token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(200)
    .json({ status: "success", message: "User logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
