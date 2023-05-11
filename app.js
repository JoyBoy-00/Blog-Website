//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "I am Gaurav Kumar. CSE undergrad from KIIT. Currently learning Web Development and C++ and passionate about Blockchain Development.";
const contactContent = "Address:  4C-131, King's Palace 7C, KIIT University,Bhuwaneswar        Phone no: 6207986183            Gmail Id: abcdsuper100@gmail.com</h3>";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];


app.get("/", function(req,res){
  res.render("home", {startingContent: homeStartingContent, posts: posts})
})

app.get("/contact", function(req,res){
  res.render("contact", {contactContent: contactContent});
})

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent})
})

app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  const post ={
    titleMessage : req.body.titlePublish,
    postMessage : req.body.postPublish
  }
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:title", function(req,res){
  const requestedTitle = req.params.title;
  posts.forEach(function(post){
    if(lodash.lowerCase(requestedTitle) === lodash.lowerCase(post.titleMessage))
    res.render("post", {title: post.titleMessage, content: post.postMessage})
  })
})

app.listen(3000, function() {
  console.log("Hello World started on port 3000");
});
