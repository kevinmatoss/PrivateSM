// src/Posts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => setPosts(response.data));
  }, []);

  const handleLike = (postId) => {
    // Lógica para incrementar o like (a ser implementada)
  };

  const handleComment = (postId, comment) => {
    // Lógica para adicionar um comentário (a ser implementada)
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <img src={post.imageUrl} alt={post.title} />
          <p>{post.content}</p>
          <p>{post.author.nickname}</p>
          <button onClick={() => handleLike(post._id)}>Like</button>
          <input type="text" placeholder="Comentário" onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id, e.target.value)} />
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Posts;
