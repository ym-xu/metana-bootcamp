import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function BlogDetail() {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        axios.get(`/api/blogs/${id}`)
            .then(res => setBlog(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="container mx-auto px-4 py-6">
            {blog ? (
                <div>
                    <h1 className="text-3xl font-bold">{blog.title}</h1>
                    <img src={`https://placehold.co/600x400`} alt={blog.title} className="w-full h-auto my-4"/>
                    <p className="text-gray-700">{blog.content}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default BlogDetail;