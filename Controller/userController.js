const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const thumbnail = req.files?.thumbnail?.[0]?.path || "";
    const picture = req.files?.picture?.[0]?.path || "";

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      thumbnail,
      picture,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        name: newUser.name,
        email: newUser.email,
        thumbnail: newUser.thumbnail,
        picture: newUser.picture,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error.message);
    res.status(500).json({ error: "Registration failed. Please try again later." });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful!",
      user: {
        name: user.name,
        email: user.email,
        thumbnail: user.thumbnail,
        picture: user.picture,
        token,
      },
    });
  } catch (error) {
    console.error("Error during user login:", error.message);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
};
