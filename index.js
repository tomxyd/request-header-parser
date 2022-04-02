const express = require("express");
var http = require("http");
require("browser-env")();

const app = express();

let ipAddress = "";

http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
     resp.on("data", function (ip) {
          ipAddress += ip;
     });
});

app.use(express.static("public"));

app.get("/", (req, res) => {
     res.sendFile(__dirname + "/views/index.html");
});
app.get("/api/whoami", (req, res) => {
     let userLang = window.navigator.userLanguage || window.navigator.language;
     let browserSoftware = navigator.userAgent;

     res.json({ ipaddress: ipAddress, language: userLang, software: browserSoftware });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening.."));
