const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
  userId: String,
  productId: String,
  quantity: Number,
  total: Number,
  date: Date,
  status: String

})
orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
module.exports = mongoose.model('Order', orderSchema)