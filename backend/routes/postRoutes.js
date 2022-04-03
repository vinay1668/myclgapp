const express = require("express")

const router = express.Router();
const {getPosts, getUserPosts , createPost,deletePost,updatePostVotes}  = require("../controllers/postController.js")

const {protect} = require('../middleware/authMiddleware.js')
router.route('/').post(protect, createPost);
router.route('/get').post(protect, getPosts);
router.route('/:id').get(protect, getUserPosts);
router.route('/:id').put(protect, updatePostVotes).delete(protect, deletePost)

module.exports = router;