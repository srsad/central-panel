/**
 * История событий сделки
 */

const { model, Schema } = require('mongoose')

const crmHistoryRequest = new Schema({})

module.exports = model('crm_history_requests', crmHistoryRequest)
