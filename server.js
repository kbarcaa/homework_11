
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// ===================================================

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "public/index.html"))
})
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "public/notes.html"))
})

// ===================================================

app.get("/api/notes", (req,res)=>{
  res.json([{"title":"Test Title","text":"Test text"}])
})

// Port listener
app.listen(PORT, ()=>{
  console.log("Web Page is live on Port: " + PORT)
})
