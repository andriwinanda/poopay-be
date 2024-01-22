const OrderModel = require('../models/order.model')
const ProductModel = require('../models/product.model')
const TransactionModel = require('../models/transaction.model')


async function create(req, res) {
  try {
    const { userId, productId, quantity, total, date, status } = req.body
    const order = new OrderModel({ userId, productId, quantity, total, date, status })
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
    const data = await OrderModel.find(query)
    const orderData = []
    for (i in data) {
      const detail = {}
      const transaction = await TransactionModel.find({ orderId: data[i].id })
      const product = await ProductModel.findById(data[i].productId)
      detail.id = data[i].id
      detail.quantity = data[i].quantity
      detail.total = data[i].total
      // detail.product = product
      // detail.status = transaction.length ? transaction[0].status : data[i].status
      // detail.date = transaction.length ? transaction[0].date : data[i].date
      // detail.transaction = transaction.length ? transaction[0] : null
      orderData.push(detail)
      console.log(transaction)
      console.log(product)
    }

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
    const data = await OrderModel.findById(id)
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
  const { userId, productId, quantity, total, date, status } = req.body
  let order = new OrderModel({ userId, productId, quantity, total, date, status }, { _id: false })
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

