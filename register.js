const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded({ extended: true });

const app = express();
app.use("/assets", express.static("assets"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userlogin",
});

//connect to the database
connection.connect(function (error) {
  if (error) throw error;
  else console.log("Connected to database successfully");
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//app.get("/", function (req, res) {
// res.sendFile(__dirname + "/index.html");
//});
// Register User
app.post("/", encoder, (req, res) => {
  let { name, email, password } = req.body;

  connection.query(
    "INSERT INTO userlog (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (error, results) => {
      if (error) {
        console.log("Error registering user:", error);
        res.sendStatus(500);
      } else {
        console.log("User registered successfully:", results);
        res.redirect("/library");
      }
    }
  );
});
app.get("/library", function (req, res) {
  res.sendFile(__dirname + "/library.html");
});
//set app port
app.listen(5000);
