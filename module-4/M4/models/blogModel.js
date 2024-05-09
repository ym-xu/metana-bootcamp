// Import Mongoose
import mongoose from 'mongoose';

// Define the Blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  images: {
    type: [String] // Assuming images are stored as an array of strings (URLs)
  },
  tags: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Blog model
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;