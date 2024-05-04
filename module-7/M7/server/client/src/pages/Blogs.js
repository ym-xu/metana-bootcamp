import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import './../styles/Blogs.css';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume this state tracks user's login status

    useEffect(() => {
        // Fetch all blog posts from the backend API
        axios.get('/api/blogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });

        // Check user's login status from local storage or authentication context
        const userLoggedIn = localStorage.getItem('isLoggedIn'); // Example: Read from local storage
        setIsLoggedIn(userLoggedIn === 'true');
    }, []);

    const handleEdit = (id) => {
        
        console.log('Edit blog with id:', id);
    };

    const handleDelete = (id) => {
        console.log('Delete blog with id:', id);
        const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
        if (confirmDelete) {
            // Optimistically update the UI to reflect deletion
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
            // Send delete request to the backend
            axios.delete(`/api/blogs/${id}`)
                .then(() => {
                    console.log('Blog post deleted successfully:', id);
                })
                .catch(error => {
                    console.error('Error deleting blog post:', error);
                });
        }
    };

    return (
        <div className="blog">
            <h1>All Blog Posts</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        {isLoggedIn && ( // Show edit and delete buttons only if user is logged in
                            <div className="actions">
                                <button onClick={() => handleEdit(blog._id)}>Edit</button>
                                <button onClick={() => handleDelete(blog._id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blogs;