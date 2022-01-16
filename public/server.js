const express = require("express");
const app = express();
require('dotenv').config();
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/send", (req, res) => {
  const { name, email, matric, course, date } = req.body;
  if (!name) res.status(400).json({ msg: "Name is require" });
  if (!email) res.status(400).json({ msg: "email is require" });
  if (!matric) res.status(400).json({ msg: "matric is require" });
  if (!course) res.status(400).json({ msg: "matric is require" });
  if (!date) res.status(400).json({ msg: "Name is require" });
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "holuwayinkzzy@gmail.com",
    subject: `Message from ${req.body.email}: 
        ${req.body.name}`,
    text: `Name: ${req.body.name} \nEmail: ${req.body.email} \nMatric Number: ${req.body.matric} \nCourse: ${req.body.course} \nDate of birth: ${req.body.date}`,
  };
  transporter.sendMail(mailOptions, (error, responose) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email Sent");
      return res.redirect("/public/success.html");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
