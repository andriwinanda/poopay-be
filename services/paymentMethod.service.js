const PaymentMethodModel = require('../models/paymentMethod.model')


async function create(req, res) {
  try {
    const { name, imageUrl, description, code } = req.body
    const paymentMethod = new PaymentMethodModel({ name, imageUrl, description, code })
    const data = await paymentMethod.save()
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
  const { keyword } = req.query
  const query = {}
  if (keyword) query.name = { "$regex": keyword, "$options": "i" }
  try {
    const data = await PaymentMethodModel.find(query)
    data.map(el => el.imageUrl = el.imageUrl)
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
    const data = await PaymentMethodModel.findById(id)
    data.imageUrl = data.imageUrl
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
  const { name, imageUrl, description, code } = req.body
  let paymentMethod = new PaymentMethodModel({ name, imageUrl, description, code }, { _id: false })
  const { id } = req.params
  try {
    const data = await PaymentMethodModel.findByIdAndUpdate(id, paymentMethod)
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
    await PaymentMethodModel.findByIdAndDelete(id)
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

