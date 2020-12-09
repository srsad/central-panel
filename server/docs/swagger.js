const { app } = require('../app')
const expressSwagger = require('express-swagger-generator')(app)

let options = {
  swaggerDefinition: {
    info: {
      description: 'Документация от центральной панели сервисного центра',
      title: 'Service center',
      version: '1.0.0'
    },
    host: process.env.BASE_URL || 'localhost:3000',
    basePath: '',
    produces: [ 'application/json', 'application/xml' ],
    schemes: [ 'http', 'https' ],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  basedir: __dirname, // абсолютный путь
  files: [ '../routes/**/*.js', '../models/**/*.js' ] // откуда собирать документацию
}

module.exports = expressSwagger(options)
