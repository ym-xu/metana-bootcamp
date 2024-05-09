import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import './../styles/Blogs.css';
import './../styles/EditBlog.css';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume this state tracks user's login status
    const [editForms, setEditForms] = useState({});

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
        setEditForms(prevEditForms => ({
            ...prevEditForms,
            [id]: true
        }));
    };

    const handleCancelEdit = (id) => {
        setEditForms(prevEditForms => ({
            ...prevEditForms,
            [id]: false
        }));
    };

    const handleSaveEdit = async (id, newTitle, newContent) => {
        // Get the new title and content from the input fields
        const title = document.querySelector('.edit-form input').value;
        const content = document.querySelector('.edit-form textarea').value;

        // Update the blog post in the frontend
        setBlogs(prevBlogs => prevBlogs.map(blog => {
            if (blog.id === id) {
                return {
                    ...blog,
                    title,
                    content
                };
            }
            return blog;
        }));

        // Send the updated blog post to the backend
        await axios.put(`/api/blogs/${id}`, { title, content })
            .then(() => {
                console.log('Blog post updated successfully:', id);
                setEditForms(prevEditForms => ({
                    ...prevEditForms,
                    [id]: false
                }));
            })
            .catch(error => {
                console.error('Error updating blog post:', error);
            });
    }


    const handleDelete = (id) => {
        console.log('Delete blog with id:', id);
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
        // Send delete request to the backend
        axios.delete(`/api/blogs/${id}`)
            .then(() => {
                console.log('Blog post deleted successfully:', id);
            })
            .catch(error => {
                console.error('Error deleting blog post:', error);
            });
        
    };

    return (
        <div className="blog">
            <h1>All Blog Posts</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id} className='blog-item'>
                        {editForms[blog.id] ? (
                            // Display edit form if edit mode is enabled for this blog post
                            <div className="edit-form" style={{ display: 'grid', gap: '10px' }}>
                                <label htmlFor="title">Title:</label>
                                <input type="text" defaultValue={blog.title} />
                                <label htmlFor="content">Content:</label>
                                <textarea defaultValue={blog.content} />
                                <button onClick={() => handleSaveEdit(blog.id)}>Save</button>
                                <button onClick={() => handleCancelEdit(blog.id)}>Cancel</button>
                            </div>
                        ) : (
                            // Display blog post if edit mode is not enabled
                            <div className="blog-post">
                                <h2>{blog.title}</h2>
                                <p>{blog.content}</p>
                                {isLoggedIn && (
                                    <div className='blog-item-actions'>
                                        <button onClick={() => handleEdit(blog.id)}>Edit</button>
                                        <button onClick={() => handleDelete(blog.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}

export default Blogs;