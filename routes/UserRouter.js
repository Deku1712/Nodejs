const express = require('express')
const userRouter = express.Router()

const UserController = require('../Controller/UsersController')

userRouter.route('/signUp').post(UserController.signUp)
userRouter.route('/logIn').post(UserController.logIn)
userRouter.route('/logOut').get(UserController.logOut)

module.exports = userRouter