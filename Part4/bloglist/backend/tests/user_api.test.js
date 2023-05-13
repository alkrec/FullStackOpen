const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

//
// Summary: Initialize/seed the database
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10) //create passwordHash
  const user = new User({ username: 'root', passwordHash }) //create user
  const user2 = new User({ username: 'root2', passwordHash }) //create user

  await user.save() //save user to database
  await user2.save() //save user to database
})

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'someUsername',
    name: 'Some Name',
    password: 'somePassword'
  }

  await api.post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()

  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(user => user.username)
  expect(usernames).toContain(newUser.username)
})

test('fail if username is taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'root',
    name: 'Some Name',
    password: 'somePassword'
  }

  const result = await api.post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('expected `username` to be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})


test('get all users, succeeds', async () => {
  const usersInDb = await helper.usersInDb()

  const response = await api.get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const users = response.body
  const names = users.map(user => user.name)

  expect(users).toHaveLength(usersInDb.length)
  expect(names).toContain(usersInDb[0].name)
})

//
// Summary: closes the database connection
afterAll(async () => {
  await mongoose.connection.close()
})
