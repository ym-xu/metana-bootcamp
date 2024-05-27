import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import './../styles/Blogs.css';
import './../styles/EditBlog.css';

function Home() {
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
        <div className="container mx-auto my-8 px-4">
            {blogs.length > 0 && (
                <div className="mb-8">
                    <div className="bg-white shadow overflow-hidden rounded-lg p-6">
                        <img src={`https://via.placeholder.com/600x400?text=Blog+Image+for+${blogs[0].title}`} alt="Featured Blog Post" className="w-full h-auto rounded"/>
                        <div className="mt-4">
                            <h2 className="text-2xl font-bold">{blogs[0].title}</h2>
                            <p className="text-gray-700">{blogs[0].content}</p>
                            {isLoggedIn && (
                                <div className="flex justify-end space-x-2 mt-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.slice(1).map(blog => (
                    <li key={blog.id} className="bg-white shadow overflow-hidden rounded-lg p-4">
                        <img src={`https://via.placeholder.com/150x150?text=${blog.title}`} alt="Blog Post" className="w-full h-auto rounded mb-2"/>
                        <h3 className="text-lg font-bold">{blog.title}</h3>
                        <p className="text-sm text-gray-700">{blog.content}</p>
                        {isLoggedIn && (
                            <div className="flex justify-end space-x-2 mt-2">
                                <button onClick={() => handleEdit(blog.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" >Edit</button>
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

export default Home;
