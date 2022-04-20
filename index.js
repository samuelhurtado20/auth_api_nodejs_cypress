const express = require('express')
const app = express()
const authRoute = require('./routes/auth')
const mongodb = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongodb.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connected to db')
})

app.use(express.json())
app.use('/api/user', authRoute)
app.listen(process.env.PORT, () => {
  console.log('server is running on port: ' + process.env.PORT)
})

//npm i express --save
//npm i cypress --save-dev
//npm i nodemon --save-dev
//npm i mongoose --save
//npm i dotenv
//npm i @hapi/joi
//npx cypress open
//npx cypress open --config watchForFileChanges=true
//npm i guid --save-dev
//npm i bcryptjs
//npm i jsonwebtoken --save
