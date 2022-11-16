import server from "./src/server/index.js";

// Only load dotenv if we are in developement mode
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on http:localhost:${PORT}/api`));

server.on("error", error => {
  LogError(`Server error: ${error}`);
});
