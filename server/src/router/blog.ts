import { Router } from "express";
import {
  blogListController,
  createBlog,
  deleteBlog,
  getBlogItem,
  updateBlog,
  uploadFile,
} from "../controller/BlogController";



const routerBlog = Router();
routerBlog.get("/blog_list", blogListController);

routerBlog.post("/create_blog", createBlog);
routerBlog.get("/:id", getBlogItem);
routerBlog.put("/:id", updateBlog);
routerBlog.delete("/:id", deleteBlog);
routerBlog.post("/uploadFile",  uploadFile);
export default routerBlog;
