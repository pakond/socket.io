const frontVersion = "0.0.4";
const fs = require("fs");
const express = require("express");
const app = express();
const https = require("https");
const server = https
  .createServer(
    {
      key: fs.readFileSync("privkey.pem"),
      cert: fs.readFileSync("fullchain.pem"),
    },
    app
  )
  .listen(3001);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "https://newcmh-dev.benchmarking30.com",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connection established");
  socket.on("checkVersion", (id, version) => {
    if (version !== frontVersion) {
      socket.emit("resolveVersion");
    }
  });
});
