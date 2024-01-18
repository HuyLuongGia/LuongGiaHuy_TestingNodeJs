const express = require("express");
const mysql2 = require("mysql2");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`BE is starting at port, ${port}`);
});

app.get("/", (req, res) => {
    res.render("index");
});

// Read Data User
app.get("/dataUser", (req, res) => {
    const sqlShowData = "SELECT * FROM users";
    db.query(sqlShowData, (err, result) => {
        if (err) {
            console.log("Error to read data user", err);
            res.send("Error to read data user");
        } else {
            res.render("dataUser", { account: result });
        }
    });
});

// Create Data User
app.get("/addAccount", (req, res) => {
    res.render("addAccount");
});

app.post("/addAccount", (req, res) => {
    const { firstName, lastName, mobile, userName, password } = req.body;
    const sqlCreate =
        "INSERT INTO users(firstName, lastName, mobile, userName, password) VALUES (?, ?, ?, ?, ?)";
    db.query(
        sqlCreate,
        [firstName, lastName, mobile, userName, password],
        (err, result) => {
            if (err) {
                console.error("Error Create Data User", err);
            } else {
                res.redirect("/dataUser");
            }
        }
    );
});

// Connect Databse
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    port: "3307",
    database: "TestingNodeJsFPT",
});

// Test Connect Database
db.connect((err) => {
    if (err) {
        console.error("Error connect to Database !", err);
        throw err;
    }
    console.log("Connect Database Successful");
});
