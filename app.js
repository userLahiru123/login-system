require("dotenv").config();
const express = require("express");
const app = express();
const allRouter = require("./api/app.router");

app.use(express.json());

app.use("/api", allRouter);
const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
