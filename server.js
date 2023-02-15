const fs = require("fs")
const express = require("express")

const app = express();

PORT = 3001;

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log("Now Listening on Port " + PORT)
})