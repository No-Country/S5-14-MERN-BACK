import { Server as SocketServer } from "socket.io";
import http from "http";
import server from "./index.js";
import jwt from "jsonwebtoken";

const serverSocket = http.createServer(server);
const io = new SocketServer(serverSocket, {
  cors: {
    origin: process.env.ORIGINS_ALLOWED.replace(/ /g, "").split(",")
  }
});

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    console.log(socket.handshake.query.token);
    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        return next(new Error("Authentication error"));
      }
      socket.decoded = decoded;
      console.log("decoded", socket.decoded);
      next();
    });
  } else {
    console.log("error");
    next(new Error("Authentication error"));
  }
});

io.on("connect", function (socket) {
  console.log("you are connected as ", socket.decoded.id);
});

export default serverSocket;
