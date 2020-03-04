require('dotenv').config()
const express = require('express')
const compression = require('compression')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

mongoose
  // .plugin(accessibleRecordsPlugin)
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('MongoDB connected...'))
  // eslint-disable-next-line no-console
  .catch((e) => console.error('MongoDB connection error', e))

app.use(compression())
// app.use(passport.initialize())
// passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(accessesCASL)
// // app.use(busboyBodyParser())

// public REST API
// app.use('/api/v1', mappedRoutes);

module.exports = app
