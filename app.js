//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  " Hi, I'm Yigit. If I help you while learning something new, I'll realy happy :) ";
const contactContent = " yigitozdamar@hotmail.com";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://yigitozdamar:yigitozdamar123@cluster0.66djs.mongodb.net/blogDB",
  { useNewUrlParser: true }
);

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, postas) {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      posts: postas,
    });
  });
});

app.get("/posts/:postId", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedId = req.params.postId
  Post.findById({_id: requestedId}, (err, posta) => {
    res.render("post", {
      title: posta.title,
      content: posta.content,
  })
  // posts.forEach((post) => {
  //   const storedTitle = _.lowerCase(post.title);
  //   if (requestedTitle === storedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content,
  //     });
  //   }
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.composeTitle,
    content: req.body.composePost,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
