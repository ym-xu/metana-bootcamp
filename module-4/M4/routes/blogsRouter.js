import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js'; // Update the path as needed
import blogData from '../data/blogData.js'; // Import blog data if needed

const router = express.Router();

// Route to get all blogs
router.get('/', expressAsyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
}));

// Route to get a single blog by ID
router.get('/:id', expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
}));

// Route to create a new blog
router.post('/', expressAsyncHandler(async (req, res) => {
  const blog = new Blog({
    title: 'Sample Blog',
    content: 'Sample content',
    images: ['image1.jpg', 'image2.jpg'],
    tags: ['sample', 'blog']
  });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
}));

// Route to update a blog
router.put('/:id', expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.images = req.body.images || blog.images;
    blog.tags = req.body.tags || blog.tags;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
}));


// Route to delete a blog
router.delete('/:id', expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
}));

// Seed the blog data   
router.get('/seed', expressAsyncHandler(async (req, res) => {
  // Remove existing blogs
  await Blog.remove({});
  // Insert fresh blog data
  const createdBlogs = await Blog.insertMany(blogData);
  res.json({ createdBlogs });
}));    

export default router;
