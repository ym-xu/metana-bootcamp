import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend to create a new blog post
            await axios.post('/api/blogs', { title, content });
            // Redirect the user to the blogs page after creating the post
            window.location.href = '/blogs';
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    };

    return (
        <div>
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
}

export default Create;