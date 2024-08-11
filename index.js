import express from "express";
import bodyParser from "body-parser";



const app = express();
const port = 3000;

var entriesJSON = [];
var entryNUM=0;
var entryid=0;
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
});

app.post("/Home", (req, res) => {
  res.render(__dirname + '/views/index.ejs');
});

app.post("/entries", (req, res) => {
  console.log(entriesJSON.length);
  res.render(__dirname + '/views/entries.ejs',{data:entriesJSON});
});

app.post("/new", (req, res) => {
  res.render(__dirname + '/views/new.ejs');
});

app.post("/submit", (req, res) => {
  
 var newobject = {
    id: entryid,
    title:req.body.title,
    name:req.body.name,
    body:req.body.body,
  }

  entriesJSON[entryNUM]=newobject;
  entryNUM++;
  entryid++;
  var string = JSON.stringify(entriesJSON);
  console.log(string);
  res.render(__dirname + '/views/new.ejs');
});

app.post("/edit", (req, res) => {
  var position = -3;
  console.log('the length of the array is'+entriesJSON.length);
  for (var i=0;i<entriesJSON.length;i++) {
    if (JSON.stringify(entriesJSON[i].id) === req.body.id){
      position = i; 
    }
  }
  if (position == -3){
    console.log('could not find your entry, please enter the correct id')
  } else {
    entriesJSON[position].title=req.body.title;
    entriesJSON[position].name=req.body.name;
    entriesJSON[position].body=req.body.body;
  }
   var string = JSON.stringify(entriesJSON);
   console.log(string);
   res.render(__dirname + '/views/new.ejs');
 });

 app.post("/delete", (req, res) => {
  var position = -3;
  console.log(req.body.id);
  console.log('the length of the array is'+entriesJSON.length);
  for (var i=0;i<entriesJSON.length;i++) {
    if (JSON.stringify(entriesJSON[i].id) === req.body.id){
      position = i; 
    }
  }
  if (position == -3){
    console.log('could not find your entry, please enter the correct id')
  } else {
    entryNUM--;
    entriesJSON.splice(position,1);
    
  }
   var string = JSON.stringify(entriesJSON);
   console.log(string);
   res.render(__dirname + '/views/new.ejs');
 });


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});