const fs = require("fs")
const express = require("express")
const path = require("path")
const db = require("./db/db.json")

const app = express();

PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    res.json(db)
})

app.post("/notes", (req, res) => {
    console.log(req.body)
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, () => {
    console.log("Now Listening on Port " + PORT)
})