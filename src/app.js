const express = require("express");
const router = require("./router");

const app = express();

// log middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  next();
});
app.use(express.static(__dirname + "/client"));
app.use(router);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
