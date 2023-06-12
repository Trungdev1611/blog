import { Router } from "express";
import { blogListController } from "../controller/BlogController";

const routerBlog = Router()
routerBlog.get('/blog_list', blogListController)

export default routerBlog