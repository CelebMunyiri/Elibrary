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
// Register User
/*
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
        res.sendStatus(200);
      }
    }
  );
});*/

app.post("/", function (req, res) {
  let { email, password } = req.body;
  // console.log(req.body.password);
  // console.log(req.body.username);

  // var email = req.body.email;
  //var password = req.body.password;
  connection.query(
    "SELECT*FROM userlog WHERE email=? and password=?",
    [email, password],
    function (error, results, fields) {
      if (results.length > 0) {
        res.redirect("/library");
      } else {
        res.redirect("/");
      }
      res.end();
    }
  );
});

//when login is success
app.get("/library", function (req, res) {
  res.sendFile(__dirname + "/library.html");
});
app.get('/books', (req, res) => {
  const user = req.session.user;
  if (!user) {
    res.status(401).send('Unauthorized');
  } else {
    // Generate array of image URLs
    //const books = [];
    for (let i = 1; i <= 23; i++) {
      embed.src=`/books/Book-${i}.pdf`;
    }

    res.send(books);
  }
});
//set app port
app.listen(5100);
