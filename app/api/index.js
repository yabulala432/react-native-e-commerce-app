const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

//

mongoose
  .connect(
    "mongodb+srv://yeabsiraYonas:yeabsira@cluster0.pinw6su.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
