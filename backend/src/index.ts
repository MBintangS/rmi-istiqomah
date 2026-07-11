import "dotenv/config";
import { connectDatabase } from "./config/database";
import { createApp } from "./app";
import "./models";

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined. Copy backend/.env.example to backend/.env");
  }

  await connectDatabase(mongoUri);

  const app = createApp();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Health check: http://0.0.0.0:${PORT}/api/health`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
