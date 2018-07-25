const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb://saifou:typhoon1@ds129051.mlab.com:29051/gesroom")
    .then(() => {
        console.log('connected to database!')
})
    .catch(() => {
        console.log('connection failed!')
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/images", express.static(path.join("back/images")));
    
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
      next();
    });
    
    app.use("/api/posts", postsRoutes);
    
    module.exports = app;
    