// === variables =====================================================
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

  // getting data from db json and parsing it to use as obj
app.get("/api/notes", (req, res) => {
  let allNotes = fs.readFileSync("./db/db.json");
  allNotes = JSON.parse(allNotes);
  res.json(allNotes);
});

  // getting data from db json to write and push in new note with unique id
app.post("/api/notes", (req, res) => {
  let allNotes = fs.readFileSync("./db/db.json");
  allNotes = JSON.parse(allNotes);
  let newNote = req.body;
  let uniqueID = allNotes.length
  newNote.id = uniqueID;
  console.log(newNote);
  allNotes.push(newNote);
  allNotes = JSON.stringify(allNotes);
  fs.writeFileSync("./db/db.json", allNotes);
  res.json({ result: "success", allNotes });
  console.log(allNotes);
});

  // getting data from db json to delete and write in new obj->str without it
app.delete("/api/notes/:id", (req, res) => {

  let allNotes = fs.readFileSync("./db/db.json");
  allNotes = JSON.parse(allNotes);
  allNotes = allNotes.filter(note=>{
    return note.id != req.params.id;
  });
  allNotes = JSON.stringify(allNotes);
  fs.writeFileSync("./db/db.json", allNotes);
  allNotes = JSON.parse(allNotes);
  res.json(allNotes)

});

// === PORT ============================================================

app.listen(PORT, () => {
  console.log("Web Page is live on Port: " + PORT);
});
