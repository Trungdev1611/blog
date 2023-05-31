import express  from "express";
import dotenv from "dotenv";
import routerAuth from "./router/auth";
import {Request, Response} from 'express'
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req:Request, res:Response) => {
  res.status(200).json({
    message: "Bạn đã truy cập vào link http://localhost:3002",
  });
});
app.use(express.json());
app.use("/auth", routerAuth);
app.listen(PORT, () => {
  console.log("server đang chạy trên port 3005");
});
