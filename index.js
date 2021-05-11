require("dotenv").config();
const express = require("express");
const db = require("./models/connection");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const NODE_PORT = process.env.NODE_PORT || 3001;

app.listen(NODE_PORT, async () => {
  await db.connect();
  const workflow = await db.query("SELECT * FROM status_tb");
  console.log(workflow.rows);
  console.log(`Listening on ${NODE_PORT}`);
});
