const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Verification = require("../models/verification.model");
const { sendEmail } = require("../libs/send-email.js");
const aj = require("../libs/arcjet.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email address is already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashPassword });

    // TODO : send email

    res.status(201).json({ message: "Verification email sent to your email. Please verify your account to continue." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    if(!user.isEmailVerified) {

    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id, purpose: "login" }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    user.lastLogin = new Date();
    await user.save();

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({ 
      message: "Login successful",
      token,
      user: userData,
     });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  registerUser,
  loginUser,
};



