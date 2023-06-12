import express, { NextFunction }  from "express";
import dotenv from "dotenv";
import routerAuth from "./router/auth";
import {Request, Response} from 'express'
import { testConnection } from "./DB/connect";
import createModel from "./models/indexModel";
import { customError, listtRouteExclude } from "./fnhelper";
import { checkAuth } from "./middleware/checkauth";
import routerBlog from "./router/blog";
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
console.log('port', PORT)

app.use(cors());
app.get("/", (req:Request, res:Response) => {
  res.status(200).json({
    message: "Bạn đã truy cập vào link http://localhost:3002",
  });
});
// test connection 
testConnection()
createModel()


//ngoại trừ login và register, router nào cũng check auth
app.use((req: Request, res: Response, next: NextFunction) => {
  if (listtRouteExclude.includes(req.path)) {
    // Cho phép truy cập trực tiếp vào route register và login mà không áp dụng middleware check token
    next();

  } else {
    // Áp dụng middleware check token cho các route khác
    checkAuth(req, res, next);

  }
});

app.use(express.json());
app.use("/auth", routerAuth);
app.use("/blog", routerBlog);




//xử lý lỗi và trả lỗi về client cho toàn bộ request
app.use((err: customError, req: Request, res: Response, next: NextFunction) => {
  console.log('err trong global', err)
  return res.status(err.statusCode ||  500).json({ message: err.message, data: err.data, status: 0 });
});
app.listen(PORT, () => {
  console.log("server đang chạy trên port 3002");
});
