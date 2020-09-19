require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const compression = require('compression')
const bodyParser = require('body-parser')

const passportStrategy = require('./middleware/passport-strategy')
// const sessionMiddleware = require('./middleware/sessions')
const roleRoutes = require('./routes/v1/role.routs')
const userRoutes = require('./routes/v1/user.routs')
const authRoutes = require('./routes/v1/auth.routs')
const settingsRoutes = require('./routes/v1/settings')
const domainRoutes = require('./routes/v1/domain.routs')
const ssiteRoutes = require('./routes/v1/sourceSite.routs')
const partRoutes = require('./routes/v1/part.routs')
const sessionRoutes = require('./routes/v1/session.routs')
const recordingRoutes = require('./routes/v1/recording')
const exceptionsRoutes = require('./routes/v1/exceptions.routs')
const reportRoutes = require('./routes/v1/report')
const CRMRoutes = require('./routes/v1/crm')

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

app.use(cors())
app.use(compression())
// app.use(sessionMiddleware)
app.use(passport.initialize())
passport.use(passportStrategy)

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
app.use('/api/v1/source-site', ssiteRoutes)
app.use('/api/v1/part', partRoutes)
app.use('/api/v1/session', sessionRoutes)
app.use('/api/v1/recording', recordingRoutes)
app.use('/api/v1/report', reportRoutes)
app.use('/api/v1/crm', CRMRoutes)
app.use('/api/v1/exceptions', exceptionsRoutes)

module.exports = app
