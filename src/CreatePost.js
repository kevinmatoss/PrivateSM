// src/CreatePost.js
import React, { useState } from 'react';
import { storage } from './firebase';
import axios from 'axios';

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    if (image) {
      const imageRef = storage.ref(`images/${image.name}`);
      await imageRef.put(image);
      imageUrl = await imageRef.getDownloadURL();
    }

    const newPost = { title, content, imageUrl, author: user.uid };
    await axios.post('http://localhost:3000/posts', newPost);

    setTitle('');
    setContent('');
    setImage(null);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Conteúdo" required></textarea>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Postar</button>
    </form>
  );
};
// src/CreatePost.js
const handleSubmit = async (e) => {
  e.preventDefault();
  let imageUrl = '';

  if (image) {
    const imageRef = storage.ref(`images/${image.name}`);
    await imageRef.put(image);
    imageUrl = await imageRef.getDownloadURL();
  }

  const newPost = { title, content, imageUrl, author: user.uid };
  await axios.post('http://localhost:3000/posts', newPost); // Alterar para a URL do Heroku após o deploy

  setTitle('');
  setContent('');
  setImage(null);
};

// src/Posts.js
useEffect(() => {
  axios.get('http://localhost:3000/posts') // Alterar para a URL do Heroku após o deploy
    .then(response => setPosts(response.data));
}, []);

export default CreatePost;
