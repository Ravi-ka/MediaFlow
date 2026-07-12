import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response, Express } from "express";

const app: Express = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "API is healthy",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
});

export default app;