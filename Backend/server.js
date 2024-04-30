const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

let PORT = process.env.PORT || 3000;

// importing routes

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
