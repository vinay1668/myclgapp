// @desc    Get all Posts
// @route   GET /posts
// @access   Private

const getPosts = async (req,res) => {
    res.status(200).json({message:"get all Posts"})
}
// @desc    Create a Post
// @route   CREATE /posts
// @access   Private

const createPost = async (req,res) => {
    if(!req.body.text)  {
        res.status(400)
        throw new Error('please add a text field')
    }
}

// @desc    Update a Post
// @route   UPDATE /posts/:id
// @access   Private

const updatePost = async (req,res) => {
    res.status(200).json({message:`Update Post ${req.params.id}`})
}

// @desc    Delete a Post
// @route   DELETE /posts/:id
// @access   Private

const deletePost = async (req,res) => {
    res.status(200).json({message:`Delete Post ${req.params.id}`})
}

module.exports ={
    getPosts,
    createPost,
    deletePost,
    updatePost
}
