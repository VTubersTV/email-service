import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import { sendEmail } from "./services/emailService";
import { logger } from "./config/logger";
import { envSchema } from "./config/email";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Email endpoint
app.post("/api/email/send", sendEmail);

// Apply error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    const env = envSchema.parse(process.env);
    logger.info(`Server is running on port ${port}`);
});