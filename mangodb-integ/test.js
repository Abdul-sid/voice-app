const mongoose = require("mongoose");
const dburi = "mongodb+srv://abdurrehman:123456abdas@cluster0-mfsvo.mongodb.net/test?retryWrites=true&w=majority";
const express = require("express");
const bodyParser = require("body-parser");
const app = express().use(bodyParser.json());

mongoose.connect(dburi, { useNewUrlParser: true }).catch(err => {
    console.log("error occured", err);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
})
mongoose.connection.on("connected", () => {
    console.log("Connected with database");
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected with database.");
    process.exit(1);
});

var userDetail = new mongoose.Schema(
    {
        givenname: { type: String, required: true },
        number: { type: String, required: true },
        email: { type: String, required: true },

    },
    { collection: "Test-data" }
);
var model = new mongoose.model("Questions", userDetail);
var info = {
    givenname: "Siddiqui",
    number: "1234",
    email: "xyz@.com"
}


var saveData = new model(info);
saveData.save((err, mydata) => {
    if (err) {
        console.log(err);
    } else {

    }
});




























// const mongoose = require("mongoose");
//  const dburi = "mongodb+srv://abdurrehman:123456abdas@cluster0-mfsvo.mongodb.net/test?retryWrites=true&w=majority";
//  const express = require("express");
//  const bodyParser = require("body-parser");
//  const app = express().use(bodyParser.json());

//  mongoose.connect(dburi, { useNewUrlParser: true }).catch(err => {
//      console.log("error occured", err);
//  });

//  mongoose.connection.on('error', function (err) {//any error
//      console.log('Mongoose connection error: ', err);
//      process.exit(1);
//  })
//  mongoose.connection.on("connected", () => {
//      console.log("Connected with database");
//  });

//  mongoose.connection.on("disconnected", () => {
//      console.log("Disconnected with database.");
//      process.exit(1);
//  });

//  var userDetail = new mongoose.Schema(
//      {
//          Name: { type: String, required: true },
//          Number: { type: String, required: true },
//          Email: { type: String, required: true },


//      },
//      { collection: "Test-data" }
//  );
//  var model = new mongoose.model("Questions", userDetail);
//  var info = {
//      Name: "Siddiqui",
//      Number: "1234",
//      Email: "xyz@.com"
//  }


//  var saveData = new model(info);
//  saveData.save((err, mydata) => {
//    if (err) {
//      console.log(err);
//    } else {

//    }
//  });
