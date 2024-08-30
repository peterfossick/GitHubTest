var express = require("express")
var cfenv = require('cfenv')
var ss = require("serve-static")
var ba = require("basic-auth")
var app = express()
// app.use("/", ss(__dirname + "/public"))
app.use(entry)
app.use("/", ss(__dirname + "/public"))
app.enable('trust proxy');

var username = "GTS_SERV";
var password = "Pa$$word";

function entry(req, res, next) {
    var objUser = ba(req)
    //     if (objUser === undefined || new Buffer(objUser.name).toString('base64') !== "servicedesign" || new Buffer(objUser.pass).toString('base64') !== "servicedesign" && req.secure == true) {

    if (req.secure == true) {
      if (objUser === undefined || new Buffer(objUser.name).toString('base64') !== new Buffer(username).toString('base64')  || new Buffer(objUser.pass).toString('base64') !== new Buffer(password).toString('base64') ) {
        res.set("WWW-Authenticate", "Basic realm=Authorization Required")
        res.status(401).end()
      }
      else {
        next();
      }
    }
    else {
      res.json('Connection not secure. Please use: https://')
    }
}

var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


// var express = require("express")
// var cfenv = require('cfenv')
// var ss = require("serve-static")
// var ba = require("basic-auth")
// var app = express()
// // app.use("/", ss(__dirname + "/public"))
// app.use(entry)
// app.use("/", ss(__dirname + "/public"))


// function entry(req, res, next) {
//     var objUser = ba(req)
//     if (objUser === undefined || objUser.name !== "BELFIUS_DT" || objUser.pass !== "IBM4BELFIUS_DTWS") {
//         res.set("WWW-Authenticate", "Basic realm=Authorization Required")
//         res.status(401).end()
//     } else { next() }
// }

// var appEnv = cfenv.getAppEnv();
// // start server on the specified port and binding host
// app.listen(appEnv.port, '0.0.0.0', function() {
//   // print a message when the server starts listening
//   console.log("server starting on " + appEnv.url);
// });