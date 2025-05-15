const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
  let { name, email, imageurl } = req.body;
  let updateduser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      image: imageurl,
      email,
      name,
    },
    { new: true }
  );
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, email, imageurl } = req.body;
  let createduser = await userModel.create({
    image: imageurl,
    email,
    name,
  });
  res.redirect("/read");
});

app.listen(3000);
