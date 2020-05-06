// === variable ====================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// === page routes ====================================================

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// === data routes ====================================================

app.get("/api/notes", (req, res) => {
  let savedNotes = fs.readFileSync("./db/db.json");
  savedNotes = JSON.parse(savedNotes);
  res.json(savedNotes);
});

app.post("/api/notes", (req, res) => {
  
  let savedNotes = fs.readFileSync("./db/db.json");
  savedNotes = JSON.parse(savedNotes);

  let newNote = req.body;
  console.log(newNote);
  console.log(savedNotes);

  savedNotes.push(newNote);
  savedNotes = JSON.stringify(savedNotes);
  fs.writeFileSync("./db/db.json", savedNotes);

  res.json({ result: "success", savedNotes });
});

// === delete route ====================================================

app.delete("api/notes/:id", (req, res) => {});

// === PORT ====================================================

app.listen(PORT, () => {
  console.log("Web Page is live on Port: " + PORT);
});
