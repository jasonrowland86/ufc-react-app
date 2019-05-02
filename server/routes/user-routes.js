const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../auth/auth');


userRouter.get('/user', userController.index);
userRouter.get('/users', userController.all);
userRouter.post('/user', userController.create);
userRouter.post('/user/picks', userController.addFighter);
userRouter.get('/user/picks', auth.loginRequired, userController.getPicks);
userRouter.delete('/user/picks/:id', userController.deletePick);
// userRouter.put('/user/:id', userController.index);
userRouter.delete('/user/:id', userController.delete);

module.exports = userRouter;
