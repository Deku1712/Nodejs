const express = require('express')
const userRouter = express.Router()

var passport = require('passport')
var authenticate = require('../authenticate');
const UserController = require('../Controller/UsersController')



userRouter.post('/signup', UserController.signUp);

userRouter.post('/login', passport.authenticate('local'), UserController.logIn);

userRouter.get('/logout', UserController.logOut);



module.exports = userRouter