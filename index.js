import dotenv from 'dotenv';
import server from './src/server/index.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`Server running on http:localhost:${PORT}/api`)
);

server.on('error', (error) => {
  LogError(`Server error: ${error}`);
});
