import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        description: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const toggleEditMode = useCallback(() => {
        setEditMode(!editMode);
    }, [editMode]);

    const saveChanges = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.put('/api/auth/updateProfile', {
                userId: user.id, 
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                description: user.description,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEditMode(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            {editMode ? (
                <form onSubmit={saveChanges} className="mt-4">
                    <label className="block">
                        <span className="font-bold">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded"
                            disabled={isSaving}
                        />
                    </label>
                    <label className="block mt-3">
                        <span className="font-bold">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded"
                            disabled={isSaving}
                        />
                    </label>
                    <label className="block mt-3">
                        <span className="font-bold">First Name:</span>
                        <input
                            type="text"
                            name="first_name"
                            value={user.first_name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded"
                            disabled={isSaving}
                        />
                    </label>
                    <label className="block mt-3">
                        <span className="font-bold">Last Name:</span>
                        <input
                            type="text"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded"
                            disabled={isSaving}
                        />
                    </label>
                    <label className="block mt-3">
                        <span className="font-bold">Description:</span>
                        <textarea
                            name="description"
                            value={user.description}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded"
                            rows="3"
                            disabled={isSaving}
                        />
                    </label>
                    <button type="submit" disabled={isSaving} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button type="button" onClick={toggleEditMode} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
                        Cancel
                    </button>
                </form>
            ) : (
                <div className="mt-4">
                    <p><span className="font-bold">Username:</span> {user.username}</p>
                    <p><span className="font-bold">Email:</span> {user.email}</p>
                    <p><span className="font-bold">First Name:</span> {user.first_name}</p>
                    <p><span className="font-bold">Last Name:</span> {user.last_name}</p>
                    <p><span className="font-bold">Description:</span> {user.description}</p>
                    <button onClick={toggleEditMode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;