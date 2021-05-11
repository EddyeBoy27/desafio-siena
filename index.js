require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const NODE_PORT = process.env.NODE_PORT || 3001;

app.listen(NODE_PORT, () => console.log(`Listening on +${NODE_PORT}`));
