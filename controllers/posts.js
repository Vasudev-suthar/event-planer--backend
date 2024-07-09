const Post = require("../models/Post")

const postController = {
    create: async (req, res) => {
        try {
            const data = req.body
            const newPost = new Post(data)
            let savedPost = await newPost.save()
            res.status(201).send({ message: "New post create successfully", savedPost })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },
    getAllPosts: async (req, res) => {
        try {
            await Post.find({}, {}).populate("createdBy", { username: 1 }).populate("comments.personId", { username: 1 })
                .then((posts) => {
                    res.status(201).json(posts);
                });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}
module.exports = postController