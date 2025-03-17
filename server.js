const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
app.get("/", (req, res) => {
  res.send(`<h1>Hello , Welcome to our hotel</h1>`);
});

const personRoutes = require("./routes/personRoutes");
const menuItemsRoutes = require("./routes/menuItemRoutes");
app.use("/menu", menuItemsRoutes);
app.use("/person", personRoutes);
app.listen(port, () => {
  console.log(`Server is running on port 3000`);
});
