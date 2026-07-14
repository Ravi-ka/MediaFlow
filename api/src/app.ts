import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response, Express } from "express";
import pool from "./postgres";

const app: Express = express();
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "API is healthy",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
});

app.get("/testdb", async (req:Request,res:Response)=>{
  const {rows} = await pool.query('SELECT * FROM user_test');
  res.status(200).json({
    message:"Database is healthy",
    date: rows[0].now,
    rows
  });
})

export default app;