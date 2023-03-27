const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");

const port = process.env.PORT || 5000;
//const cookieParser = require("cookie-parser");
app.use("/js", express.static(_dirname + "./assets/js"));
app.use("/", express.static(_dirname + "./books"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
db.connect((err) => {
  if (err) throw err;
  console.log("database connected");
});
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));
app.listen(3000);
