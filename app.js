const express = require("express");
const todocontroller = require("./controller/todocontroller");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("./assets"));

todocontroller(app);

app.listen(3000);
console.log("rishi")