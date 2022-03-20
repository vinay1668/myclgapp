const express = require("express")

const router = express.Router();
const {getPosts, createPost,deletePost,updatePost}  = require("../controllers/postController.js")


router.route('/').get(getPosts).post(createPost);
router.route('/:id').put(updatePost).delete(deletePost)

module.exports = router;