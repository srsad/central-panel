require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const roleRoutes = require('./routes/v1/role.routs')
const userRoutes = require('./routes/v1/user.routs')
const authRoutes = require('./routes/v1/auth.routs')
const settingsRoutes = require('./routes/v1/settings')
const domainRoutes = require('./routes/v1/domain.routs')

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
// app.use(busboyBodyParser())

// public REST API
app.use('/api/v1/role', roleRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/settings', settingsRoutes)
app.use('/api/v1/domain', domainRoutes)

module.exports = app
