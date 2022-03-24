const express = require("express")

const router = express.Router();
const {getPosts, getUserPosts , createPost,deletePost,updatePost}  = require("../controllers/postController.js")

const {protect} = require('../middleware/authMiddleware.js')
router.route('/').get(protect, getPosts).post(protect, createPost);
router.route('/:id').get(protect, getUserPosts);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost)

module.exports = router;