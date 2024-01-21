const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = new Schema({
  orderId: String,
  amount: String,
  status: String,
  providerId: String,
  date: Date
})
transactionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
module.exports = mongoose.model('Transaction', transactionSchema)