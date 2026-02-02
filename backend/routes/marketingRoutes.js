const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/marketingController');

router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;