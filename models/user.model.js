const mongoose = require( 'mongoose' )
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema( {
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  zip: {
    type: String,
    require: true
  },
  role: {
    type: String,
    require: true
  }
} )

userSchema.set( 'toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret, options )
  {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
} )

userSchema.methods.comparePassword = function(pass) {
  return bcrypt.compareSync(pass, this.password);
};


module.exports = mongoose.model( 'User', userSchema )


