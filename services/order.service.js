const OrderModel = require('../models/order.model')
const ProductModel = require('../models/product.model')
const TransactionModel = require('../models/transaction.model')


async function create(req, res) {
  try {
    const { userId, productId, providerId, quantity, price, total, status } = req.body
    const order = new OrderModel({ userId, productId, providerId, quantity, price, total, status })
    const data = await order.save()
    return res.status(200).json({
      message: 'Ok',
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function findAll(req, res) {
  let userId  = null
  const query = {}
  if (req.user.role === 'ROLE_CUSTOMER') userId = req.user.id
  if (userId) query.userId = userId

  try {
    const data = await OrderModel.find(query).populate('productId').populate('providerId').populate('userId').sort({updatedAt: 'desc'})
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
async function findOne(req, res) {
  const id = req.params.id
  try {
    const data = await OrderModel.findById(id).populate('productId').populate('providerId').populate('userId')
    if (data) {
      return res.status(200).json(data)
    }
    return res.status(404).json({
      message: 'Not Found',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function update(req, res) {
  const { userId, productId, providerId, quantity, price, total, status } = req.body
  let order = new OrderModel({ userId, productId, providerId, quantity, price, total, status }, { _id: false })
  const { id } = req.params
  try {
    const data = await OrderModel.findByIdAndUpdate(id, order)
    return res.status(200).json({
      message: 'Ok',
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function deleteOne(req, res) {
  const id = req.params.id
  try {
    await OrderModel.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Ok',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { create, findAll, findOne, update, deleteOne }

