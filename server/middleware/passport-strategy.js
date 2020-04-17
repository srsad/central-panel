require('dotenv').config()
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user.model')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT
}

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId, { _id: 1 })
    if (user) {
      // console.log('passport-strategy')
      // TODO проверка тухлости токена
      // TODO проверка рефреш токена
      // TODO проверка доступов
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (e) {
    console.error('passport-strategy.js - error', e)
  }
})
