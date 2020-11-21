/**
 * Модель статусов/этапов сделки для CRM
 */

const { model, Schema } = require('mongoose')

const crmDealStatusesSchema = new Schema({
  name: {
    type: String,
    maxlength: 255,
    index: true
  },
  type: {
    type: String,
    default: 'inwork',
    // enum: ['inwork', 'successful', 'rejection']
    // в раоте, успешные, отказные
    enum: ['new', 'inwork', 'ready', 'successful', 'deferred', 'rejection']
    // новые, на исполнении, готовые, закрытые успешно, отложенные, отказные
  },
  // описание
  description: {
    type: String,
    maxlength: 255,
    default: ''
  },
  // доступы
  access: {
    // видит
    available: [{
      type: Schema.Types.ObjectId,
      ref: 'roles'
    }],
    // меняет
    change: [{
      type: Schema.Types.ObjectId,
      ref: 'roles'
    }]
  },
  // Статусы, которые могут переходить в этот статус
  transition_here: [{
    type: Schema.Types.ObjectId,
    ref: 'crm_deal_statuses'
  }],
  // Статусы, в которые можно перевести этот статус
  transition_there: [{
    type: Schema.Types.ObjectId,
    ref: 'crm_deal_statuses'
  }],
  color: {
    type: String,
    maxlength: 32,
    default: ''
  },
  menuindex: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
})

module.exports = model('crm_deal_statuses', crmDealStatusesSchema)
