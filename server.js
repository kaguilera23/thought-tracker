const fs = require("fs")
const express = require("express")
const path = require("path")
const db = require("./db/db.json")
const util = require("util");
const readDatabase = util.promisify(fs.readFile);


const app = express();

PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    readDatabase("./db/db.json").then((data) => res.json(JSON.parse(data)));
})

app.post("/api/notes", (req, res) => {
    const {title, text} = req.body;


    const note = {
        title: title,
        text: text,
      };
  
  
      // save the note to db
      const file = "./db/db.json";
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const notesData = JSON.parse(data);
          notesData.push(note);
  
          fs.writeFile(file, JSON.stringify(notesData), (err) => {
            if (err) {
              console.error(err);
            }
            console.log(`Your note has been added!`);
            res.send(note);
          });
        }
      });
    
  })

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(PORT, () => {
    console.log("Now Listening on Port " + PORT)
})