const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", function (req, res) {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  let createduser = await userModel.create({
    name: "maanvik",
    email: "maanvik@gmail.com",
    username: "maanvik1",
  });

  res.send(createduser);
});

app.get("/update", async (req, res) => {
  let updateduser = await userModel.findOneAndUpdate(
    { username: "vanshika1" },
    { name: "Vanshika Lal" },
    { new: true }
  );
  res.send(updateduser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.send(users);
});

app.get("/delete", async (req, res) => {
  let users = await userModel.findOneAndDelete({ username: "maanvik1" });
  res.send(users);
});
app.listen(3000);
