// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/plataforma', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  nickname: String,
  email: String,
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  comments: [{ type: String }],
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

// Rota para criar um novo post
app.post('/posts', async (req, res) => {
  console.log('Recebido um novo post:', req.body);
  const post = new Post(req.body);
  await post.save();
  res.status(201).send(post);
});

app.get('/posts', async (req, res) => {
  console.log('Listando todos os posts');
  const posts = await Post.find().populate('author');
  res.status(200).send(posts);
});


// Rota principal para teste
app.get('/', (req, res) => {
  res.send('Servidor rodando corretamente');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
