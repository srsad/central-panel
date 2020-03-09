require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

// TODO eslint тупит в этом файле почемуто
// eslint-disable-next-line import/order
const roleRoutes = require('./routes/v1/role.routs')

const app = express()

mongoose
  // .plugin(accessibleRecordsPlugin)
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((e) => console.error('MongoDB connection error', e))

app.use(compression())
// app.use(passport.initialize())
// passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(accessesCASL)
// // app.use(busboyBodyParser())

// public REST API
app.use('/api/v1/role', roleRoutes)

module.exports = app
