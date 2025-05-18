const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const postModel = require("./models/post");
const post = require("./models/post");

const app = express();

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "Vanshi",
    age: 25,
    email: "vanshika@abc.com",
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postdate: "How are you?",
    user: "68297d078989d74788bf30c2",
  });

  let user = await userModel.findOne({ _id: "68297d078989d74788bf30c2" });
  user.posts.push(post._id);
  await user.save();

  res.send({ post, user });
});

app.listen(3000);
