import { Server as SocketServer } from "socket.io";
import http from "http";
import server from "./index.js";
import jwt from "jsonwebtoken";

const serverSocket = http.createServer(server);
const io = new SocketServer(serverSocket, {
  cors: {
    origin: "http://127.0.0.1:5173"
  }
});

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, process.env.SECRET_JWT, function (err, decoded) {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", function (socket) {
  console.log("autenticated user connected", socket.handshake.query.token);
});

export default serverSocket;
