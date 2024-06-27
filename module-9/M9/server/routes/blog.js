import express from "express";
import blogController from "../controllers/blog.js";
import { isAdmin, isLoggedIn } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", isLoggedIn, isAdmin, blogController.CreateBlog);
router.get("/", blogController.GetAllBlogs);
router.get("/:id", blogController.GetBlogById);
router.put("/:id", blogController.UpdateBlogById);
router.delete("/:id", blogController.DeleteBlogById);

export default router;