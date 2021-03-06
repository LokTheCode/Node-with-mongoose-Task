var express = require("express");
var app = express();
var port = 3000;
 
// app.get("/", (req, res) => {
//  res.send("Hello World");
// });

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
 });
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
})

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
  name: String,
  country: String,
  state: String
 });

 var User = mongoose.model("User", nameSchema);

 var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
  .then(item => {
  res.send("item saved to database");
  })
  .catch(err => {
  res.status(400).send("unable to save to database");
  });
 });