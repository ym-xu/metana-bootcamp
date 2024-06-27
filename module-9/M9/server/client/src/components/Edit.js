import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/blogs/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setContent(response.data.content);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the blog post:', error);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/blogs/${id}`, { title, content });
            navigate(`/blog/${id}`);
        } catch (error) {
            console.error('Error updating blog post:', error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="10"
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default EditBlog;
