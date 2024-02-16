const mongoose = require('mongoose')
const { Schema } = mongoose


const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod'
  },
  shipment: Object,
  price: Number,
  quantity: Number,
  total: Number,
  status: String,
}, { 
  timestamps: true 
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