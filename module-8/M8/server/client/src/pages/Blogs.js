import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import './../styles/Blogs.css';
import './../styles/EditBlog.css';
import { useNavigate, Link } from 'react-router-dom';

function Blogs({ isAuthenticated }) {
    const [blogs, setBlogs] = useState([]);
    const [editForms, setEditForms] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all blog posts from the backend API
        axios.get('/api/blogs')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
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
        <div className="container mx-auto pt-20 pb-24 px-4">
            {blogs.length > 0 && (
                <div className="mb-8">
                    <div className="bg-white shadow overflow-hidden rounded-lg p-6 flex flex-col md:flex-row">
                        <Link to={`/blog/${blogs[0].id}`} className="md:w-1/2">
                            <img src={`https://placehold.co/600x400`} alt="Featured Blog Post" className="h-auto rounded"/>
                        </Link>
                        <div className="mt-4 md:mt-0 md:ml-4 md:w-1/2">
                            <div>
                                <Link to={`/blog/${blogs[0].id}`} className="text-2xl font-bold hover:text-blue-500">{blogs[0].title}</Link>
                                <p className="text-gray-700">{blogs[0].content}</p>
                            </div>
                            {isAuthenticated && (
                                <div className="flex justify-end space-x-2 mt-2">
                                    <button onClick={() => navigate(`/edit/${blogs[0].id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Edit</button>
                                    <button onClick={() => handleDelete(blogs[0].id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.slice(1).map(blog => (
                    <li key={blog.id} className="bg-white shadow overflow-hidden rounded-lg p-4">
                        <Link to={`/blog/${blog.id}`} className="block hover:text-blue-500">
                            <img src={`https://placehold.co/600x400`} alt="Blog Post" className="w-full h-auto rounded mb-2"/>
                            <h3 className="text-lg font-bold">{blog.title}</h3>
                            <p className="text-sm text-gray-700">{blog.content}</p>
                        </Link>
                        {isAuthenticated && (
                            <div className="flex justify-end space-x-2 mt-2">
                                <button onClick={() => navigate(`/edit/${blog.id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">Edit</button>
                                <button onClick={() => handleDelete(blog.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Delete</button>
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