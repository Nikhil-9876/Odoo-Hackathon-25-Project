import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongo } from "./config/db.config.js";
import authorizationRoutes from "./routes/authorize.routes.js";
import { configurePassport } from "./config/passport.config.js";

// Set up the server
const PORT = process.env.PORT || 4000;
const app = express();

// Connect to MongoDB
connectMongo();

// Configure Passport
configurePassport();

// Middlewares
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGIN
        : "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allows the server to send, accept and edit credentials like httpOnly cookies.
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());

// Tests
app.get("/api/v1/ping", (req, res) => {
  return res.json({ message: "pong" });
});
app.post("/api/v1/ping", (req, res) => {
  const reqBody = req.body;
  return res.json({ ...reqBody });
});

// Routes
app.use("/api/v1/authorize", authorizationRoutes);

app.listen(PORT, () => {
  process.stdout.write(`Server is running at http://localhost:${PORT}\n`);
});
