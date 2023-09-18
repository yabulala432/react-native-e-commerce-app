const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://yeabsiraYonas:yeabsira@cluster0.pinw6su.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const User = require("./models/user");
const Order = require("./models/order");

// function to send verification email to the user

const sendVerificationEmail = async (email, verificationToken) => {
  // create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    // configure the email service
    service: "gmail",
    auth: {
      user: "yabulala432@gmail.com",
      pass: "pvdd lrpy luas dvwe",
    },
  });

  const mailOptions = {
    from: "amazon-clone",
    to: email,
    subject: "Account Verification Token",
    text:
      "Hello,\n\n" +
      "Please verify your account by clicking the link: \nhttp://" +
      req.headers.host +
      "/verify/" +
      verificationToken +
      ".\n",
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log({ error }, "in sending email");
  }
};

// endpoints to register and login

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }
    // else create a new user

    const newUser = new User({ name, email, password });

    // geenrate and store verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // save the user to the database
    await newUser.save();

    // send the verification email to the registered user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    return res.status(200).json({ message: `${name} ${email} ${password}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration failed" });
    console.log(error);
    return error;
  }
});

// endpoint to verify the user

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/verify/:verificationToken", async (req, res) => {
  try {
    const token = req.params.token;
    // find the user with the verification token
    const user = await User.findOne({
      verificationToken: token,
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // verify the user
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log({ error }, "in verify user");
    res.status(500).json({ message: "Verification failed" });
  }
});
