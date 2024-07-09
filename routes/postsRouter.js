const postController = require('../controllers/posts');


const postRouter = require('express').Router();

postRouter.post('/create', postController.create)
postRouter.get('/getAllPost', postController.getAllPosts)



module.exports = postRouter;