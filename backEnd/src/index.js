import { clerkMiddleware } from "@clerk/express";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cron from "node-cron";
import fileUpload from "express-fileupload";
import fs from "fs";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";

dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;
app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // add auth to request
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fieldSize: 10 * 1024 * 1024,
    },
  })
);
const httpServer = createServer(app);
initializeSocket(httpServer);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: "https://spotify-clone-gi9v.onrender.com",
    })
  );
}

//cron jobs for deleting old files

const tempFileDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempFileDir)) {
    fs.readdir(tempFileDir, (err, files) => {
      if (err) {
        console.log("error in deleting files", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempFileDir, file), (err) => {});
      }
    });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontEnd/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontEnd/dist/index.html"));
  });
}

// error handler

app.use((error, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});
httpServer.listen(PORT, () => {
  console.log("Port is active");
  connectDB();
});
