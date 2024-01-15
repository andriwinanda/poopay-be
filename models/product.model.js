const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const productSchema = new Schema( {
  name: String,
  imageUrl: String,
  description: String,
  price: Number
} )
productSchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options )
  {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
} )
module.exports = mongoose.model( 'Product', productSchema )