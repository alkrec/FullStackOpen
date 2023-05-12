const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')



//
// Summary: POST - create new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body // destructure request.body to extract variables

  const saltRounds = 10 //specifies the number of times that the password hashing function will be executed to generate the final hash value.
  const passwordHash = await bcrypt.hash(password, saltRounds) //create passwordHash from password in order to save to database

  const user = new User({ //create user
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save() //save user to db

  response.status(201).json(savedUser) //send created response and newly created user
})


//
// Summary: GET - return all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  console.log(users)
  response.status(200).json(users)
})


module.exports = usersRouter