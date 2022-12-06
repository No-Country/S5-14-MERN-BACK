import server from "./src/server/index.js";
import serverSocket from "./src/server/socket.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;

serverSocket.listen(PORT, () => console.log(`Server running on http:localhost:${PORT}/api`));

serverSocket.on("error", error => {
  LogError(`Server error: ${error}`);
});
