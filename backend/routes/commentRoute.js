const express = require("express")

const router = express.Router();
const {createComment} = require("../controllers/commentController.js")
const {getComment} = require("../controllers/commentController.js")
const {updateCommentVotes} = require('../controllers/commentController.js');
const {getReply} = require('../controllers/commentController.js');
const {protect} = require('../middleware/authMiddleware.js')

router.route('/').post(protect, createComment);
router.route('/get').post(protect, getComment);
router.route('/get/reply').post(protect,getReply);
router.route('/:id').put(protect, updateCommentVotes)

module.exports = router;