const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body //destructure request body for username and password

  const user = await User.findOne({ username }) //fetch user from db with username
  const passwordCorrect = user === null // check if password is correct
    ? false // if no user is found, return false password Correct
    : await bcrypt.compare(password, user.passwordHash) // if user is found, evaluate (true/false) whether password given in request body is equal to that of the password saved in db

  if(!(user && passwordCorrect)) { //if the user is not found, or the password is not correct
    return response.status(401).json({ //status code 401: Authorized response
      error: 'invalid username or password' //designate error message
    })
  }

  const userForToken = { //create object with username and userid
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(  //create a token,
    userForToken, //The decoded value will be the object in the first parameter of the function
    process.env.SECRET,//digitally signed with the Secret env variable.  Ensures only people with access to the secret can issue tokens.
    { expiresIn: 60*60 }) //token expires in 1 hour (60*60 seconds)

  response
    .status(200) //successful request, responded to with 200
    .send({ token, username: user.username, name: user.name }) //send in the response body
})

module.exports = loginRouter