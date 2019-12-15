const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", function(req, res) {
  res.render("login.pug");
});

router.post("/", async (req, res) => {
  let user = await User.findOne({
    email: req.body.email
  });

  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.redirect("/api/tasks");
});

module.exports = router;
