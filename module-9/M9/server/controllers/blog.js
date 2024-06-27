import Blog from "../models/Blog.js";

const CreateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
    
        const newBlog = await Blog.create({
        title,
        content,
        });

        console.log(newBlog._id);
        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};  

const GetAllBlogs = async (req, res) => {   
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const GetBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
    
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
    
        let blog = await Blog.findByPk(req.params.id);
    
        if (blog) {
            await blog.update({ title, content });
            blog = await Blog.findByPk(req.params.id);
            res.json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const DeleteBlogById = async (req, res) => {
    try {
        const rowsDeleted = await Blog.destroy({
            where: {
                id: req.params.id
            }
        });

        if (rowsDeleted > 0) {
            res.json({ message: 'Blog deleted successfully' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
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