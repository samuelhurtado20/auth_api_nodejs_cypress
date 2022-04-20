const route = require('express').Router()
const res = require('express/lib/response')
const User = require('../model/Users')
const { DataValidation } = require('../dataValidation')
const bcrypt = require('bcryptjs/dist/bcrypt')
const jwt = require('jsonwebtoken')

route.post('/register', async (req, res) => {
  try {
    const { error } = DataValidation.registerValidation(req.body)
    if (error) return res.status(400).send(error)

    var emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('Email exists')

    //
    const encryptedPassword = await bcrypt.hash(req.body.password, 10)

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
    })
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

route.post('/login', async (req, res) => {
  try {
    const { error } = DataValidation.loginValidation(req.body)
    if (error) return res.status(400).send(error)

    var user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).send('Invalid login')

    //
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).send('Invalid login')
    debugger
    user.password = ''
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).status(200).send(token)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

module.exports = route
