const express = require("express");

const app = express();

app.use(express.jdon());
app.use(express.urlencoded({ extend: true }));

app.get("/", function (req, res) {
  res.send("Hello /");
});

app.get("/profile", function (req, res) {
  res.send("Hello /prof");
});

app.listen(3000);
