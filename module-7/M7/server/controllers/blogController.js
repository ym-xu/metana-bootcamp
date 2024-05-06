import Blog from "./../models/Blog.js";
import axios from 'axios';

const CreateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
    
        const newBlog = new Blog({
        title,
        content,
        });
    
        await newBlog.save();
        console.log(newBlog._id);
        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};  

const GetAllBlogs = async (req, res) => {   
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const GetBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
    
        if (blog) {
        res.json(blog);
        } else {
        res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const UpdateBlogById = async (req, res) => {
    try {
        const { title, content } = req.body;
    
        const blog = await Blog.findById(req.params.id);
    
        if (blog) {
        blog.title = title;
        blog.content = content;
    
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
        } else {
        res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const DeleteBlogById = async (req, res) => {
    console.log(req.params.id);
    try {
        await Blog.findByIdAndDelete(req.params.id);

        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default {
    CreateBlog,
    GetAllBlogs,
    GetBlogById,
    UpdateBlogById,
    DeleteBlogById,
};