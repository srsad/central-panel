require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const compression = require('compression')
const bodyParser = require('body-parser')
const http = require('http')
const socket = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socket(server)

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
const crmRoutes = require('./routes/v1/crm')
const siteRoutes = require('./routes/v1/site')
const analyticsRoutes = require('./routes/v1/analytics')
const unansweredRoutes = require('./routes/v1/unanswered.routes')
const constructorRoutes = require('./routes/v1/constructor')

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

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb' }))

app.use(cors())
app.use(compression())
// app.use(sessionMiddleware)
app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// подключаю socket.io как доплнительный плагин express
app.use((req, res, next) => {
  req.io = io
  next()
})

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
app.use('/api/v1/crm', crmRoutes)
app.use('/api/v1/site', siteRoutes)
app.use('/api/v1/exceptions', exceptionsRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/unanswered', unansweredRoutes)
app.use('/api/v1/constructor', constructorRoutes)

// socket.io
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(passport.initialize()))

io.on('connection', (socket) => {
  socket.on('showUnansweredItem', (data, cb) => {
    io.emit('NEW_MESSAGE', 'an event sent to all connected clients22')
    // socket.emit('NEW_MESSAGE', 'an event sent to all connected clients')
    // socket.emit('NEW_MESSAGE', 'asd as dsa asaad')
  })
})

module.exports = {
  app,
  server
}
