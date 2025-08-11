import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/UserRoutes.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import mongoose from "mongoose";
import cors from "cors";

// Swagger definition (basic info)
const swaggerDefinition = {
  openapi: "3.0.0", // You can use swagger: '2.0' for Swagger 2.0
  info: {
    title: "My API",
    version: "1.0.0",
    description: "A simple Express API",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};

// Options for swagger-jsdoc — tells it where to find API docs
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to your route files with annotations
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Serve Swagger UI
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Freelancer API is running");
});
console.log("Mongo URI:", process.env.MONGODB_URI);

const PORT = 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
