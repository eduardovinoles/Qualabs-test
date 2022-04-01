require('dotenv').config()
const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded());

app.use(express.json());

const partA = require("./src/routes/technical-assessment/part-a");
app.use("/part-a", partA);

const partB = require("./src/routes/technical-assessment/part-b");
app.use("/part-b", partB);

console.log(process.env.PORT)

app.listen(process.env.PORT || 80, () => {
   console.log("Server on Port " + process.env.PORT );
});
