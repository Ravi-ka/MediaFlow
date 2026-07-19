import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response, Express } from "express";
import pool from "./database/postgres";
import authRouter from "./routes/auth/authRoutes";
import { authMiddleware } from "./middlewares/jwtAuthMiddleware";
import { requireTier } from "./middlewares/rbacMiddleware";
import minioClient from "./database/minio";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "API is healthy",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
});

app.get("/testdb", async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT NOW()');
  res.status(200).json({
    message: "Database is healthy",
    date: rows[0].now,
    rows
  });
})

app.get("/testminio", async (req: Request, res: Response) => {
  try {
   const buckets = await minioClient.listBuckets();
   res.status(200).json({
    message: "Buckets are healthy",
    buckets,
   });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error listing buckets');
  }
});

export default app;