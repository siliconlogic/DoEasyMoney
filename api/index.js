const express = require("express");
const app = express();
const port = 9001;

app.get("/", (req, res) => {
  res.send("DO easy money!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
