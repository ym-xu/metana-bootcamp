import express from "express";
import blogController from "../controllers/blogController.js";

const router = express.Router();

router.post("/", blogController.CreateBlog);
router.get("/", blogController.GetAllBlogs);
router.get("/:id", blogController.GetBlogById);
router.put("/:id", blogController.UpdateBlogById);
router.delete("/:id", blogController.DeleteBlogById);

export default router;