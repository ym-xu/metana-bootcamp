import express from "express";
import blogController from "../controllers/blogController.js";

const router = express.Router();

router.post("/", blogController.CreateBlog);
router.get("/", blogController.GetAllBlogs);
router.get("/:_id", blogController.GetBlogById);
router.put("/:_id", blogController.UpdateBlogById);
router.delete("/:id", blogController.DeleteBlogById);

export default router;