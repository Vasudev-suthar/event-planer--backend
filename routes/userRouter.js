const userController = require('../controllers/users');

const userRouter = require('express').Router();

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/', userController.getAllUser)
userRouter.get('/getsingleuser/:id', userController.getSingleUser)
userRouter.put('/updateuser/:id', userController.editUser)

module.exports = userRouter;