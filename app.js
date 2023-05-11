const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");

const app = express();
app.use(express.static(__dirname + "/index.html"));

// Create MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userlogin",
});

// Connect to MySQL
connection.connect((error) => {
  if (error) {
    console.log("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "Munyiri@1",
    resave: false,
    saveUninitialized: true,
  })
);

// Define routes
app.get("/", (req, res) => {
  res.sendFile(_dirname + "/index.html");
});

// Register User
app.post("/", (req, res) => {
  const { name, email, password } = req.body;

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
});

// Login User
app.post("/", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM userlog WHERE email = ? AND password = ?",
    [email, password],
    (error, results) => {
      if (error) {
        console.log("Error logging in:", error);
        res.sendStatus(500);
      } else if (results.length === 0) {
        console.log("Incorrect email or password.");
        res.sendStatus(401);
      } else {
        console.log("User logged in successfully:", results);
        req.session.user = results[0];
        res.sendStatus(200);
      }
    }
  );
});

// Logout User
app.post("/index", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log("Error logging out:", error);
      res.sendStatus(500);
    } else {
      console.log("User logged out successfully.");
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

//CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  publication_date DATE,
  cover_image VARCHAR(255)
);

//<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Library Website</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Library Website</h1>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Publication Date</th>
          <th>Cover Image</th>
        </tr>
      </thead>
      <tbody id="booksTableBody"></tbody>
    </table>
    <script src="script.js"></script>
  </body>
</html>

///</head><!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Library Website</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Library Website</h1>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Publication Date</th>
          <th>Cover Image</th>
        </tr>
      </thead>
      <tbody id="booksTableBody"></tbody>
    </table>
    <script src="script.js"></script>
  </body>
</html>
