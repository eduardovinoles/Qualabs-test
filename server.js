const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded());

const db = require("./src/utils/mongodb");

app.use(express.json());

app.listen(process.env.PORT || 80, () => {
   console.log("Server on port 3000");
});
