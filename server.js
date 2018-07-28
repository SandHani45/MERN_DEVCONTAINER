const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// BOdy Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes Refer
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

// Mango config
const db = require("./config/keys").mongoURI;

// MangoDB connet
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb conneneted "))
  .catch(err => console.log(err));
// app.get("/", (req, res) => res.send("hello Run Server"));

// Passport Middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server ruinnding ${port}`));
